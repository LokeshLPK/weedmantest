
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LearnPageHeroSection(props: LearnPageHeroSectionType) {
  const { sections = [], title, subtitle } = props;
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-700">{title}</h1>
        <p className="text-lg text-gray-600 font-bold bold mt-2">{subtitle}</p>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections?.map((resource: LearnPageHeroSectionsType) => (
          <div
            key={resource._key}
            className="relative   shadow-md overflow-hidden group"
            style={{
              backgroundImage: `url(${resource.backgroundImage.asset.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300"></div>
            <div className="relative z-10 p-6 text-white">
              <h2 className="text-2xl font-bold">{resource.title}</h2>
              <p className="mt-2 text-sm">{resource.description}</p>
              <Link href={resource.buttonLink}>
                <Button className={"mt-10"}>{resource.buttonText}</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
