"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ServicesPageCustomerSuccessStoriesSection(
  props: ServicesPageCustomerSuccessStoriesSectionType
) {
  const { title, reviews } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle auto-sliding
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Slide every 5 seconds (you can adjust this)
  }, [reviews.length, currentIndex]);

  return (
    <section
      className="py-10  bg-gray-90"
      style={{ backgroundColor: "#F6F7F7" }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-6 sm:mb-8">
          {title}
        </h1>
      </div>
      <div className="relative max-w-4xl mx-auto">
        {/* Slider Wrapper */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews?.map((review: ServicesPageCustomerCustomerStoriesReviewSectionsType) => (
              <div key={review._key} className="flex-shrink-0 w-full px-4">
                <Card className="shadow-lg p-10">
                  <CardHeader className="items-center">
                    <div className="flex items-center gap-2 mb-5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? "text-orange-400 fill-orange-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <CardTitle className="font-weight-600 text-green-800">
                      {review.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <CardDescription className="font-weight-500 text-green-800">
                      {review.content}
                    </CardDescription>
                    <div className="mt-4 flex items-center gap-3">
                      <Avatar>
                        {review.authorImage ? (
                          <Image
                            src={review.authorImage.asset.url}
                            alt={review.author}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <span className="h-full w-full flex items-center justify-center text-gray-100 ">
                            {review.author[0]}
                          </span>
                        )}
                      </Avatar>
                      <div>
                        <p className="font-weight-600 text-gray-500">
                          {review.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(review.date)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 gap-2">
          {reviews.map((_: SectionItem, index: number) => (
            <button
              key={index}
              onClick={() => {
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                }
                setCurrentIndex(index);
              }}
              className={`h-1   transition-all duration-300 ease-in-out ${
                currentIndex === index
                  ? "bg-orange-500 w-40" // Adjust the width when active (can be any value you prefer)
                  : "bg-gray-300 w-3" // Default width when inactive
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
