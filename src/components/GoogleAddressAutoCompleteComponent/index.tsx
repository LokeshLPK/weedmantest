"use client";

import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import { DEFAULT_ZONE } from "@/constants";
import { client } from "@/sanity/lib/client";
import { FRANCHISE_QUERY } from "@/sanity/lib/queries";

import { Input } from "../ui/input";

type PlacePrediction = {
  place_id: string;
  description: string;
};

type UsePlacesServiceReturn = {
  placePredictions: PlacePrediction[];
  getPlacePredictions: (request: { input: string }) => void;
};

export default function GoogleAddressAutoCompleteComponent() {
  const [inputValue, setInputValue] = useState<string>("");

  const params = useParams();

  const { placePredictions, getPlacePredictions }: UsePlacesServiceReturn =
    usePlacesService({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      options: {
        types: ["postal_code"],
        componentRestrictions: { country: DEFAULT_ZONE },
      },
    });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      getPlacePredictions({ input: value });
    } else {
      getPlacePredictions({ input: "" });
    }
  };

  const handleSelect = async (prediction: PlacePrediction) => {
    const { description } = prediction;
    const { language, sub_page } = params;
    const parts = description.split(",").map((part) => part.trim());
    const provinceAndCode = parts.find((part) =>
      /[A-Z]{2}\s[A-Z]\d[A-Z]?/.test(part)
    );
    if (provinceAndCode) {
      const [, postalCode] = provinceAndCode.split(" ");
      const data = await client.fetch(FRANCHISE_QUERY, {
        postalCode: postalCode.toLowerCase(),
      });

      if (data) {
        const slug = data.path.current;

        const newPath = `/${language || "en"}/${slug}/${sub_page || ""}`;
        window.open(newPath, "_blank");
      }
    }

    setInputValue("");
  };

  return (
    <div className="relative">
      <Input
        value={inputValue}
        onChange={handleChange}
        placeholder="ZIP/Postal Code"
        className="w-full"
      />
      {inputValue && placePredictions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 max-h-48 overflow-y-auto mt-1 rounded-md shadow-lg z-50 divide-y divide-gray-100">
          {placePredictions.map((prediction) => (
            <li
              key={prediction.place_id}
              className="group"
              onClick={() => handleSelect(prediction)}
            >
              <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ease-in-out">
                <p className="text-sm text-gray-900 font-medium group-hover:text-blue-600">
                  {prediction.description.split(",")[0]}
                </p>
                <p className="text-xs text-gray-500 mt-1 group-hover:text-blue-400">
                  {prediction.description.split(",").slice(1).join(",")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
