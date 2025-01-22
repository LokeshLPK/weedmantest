
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePageProgramSection(props: HomePageProgramSectionType) {
  const { title, description,buttonText,buttonLink } = props;
  return (
    <section className="py-16 text-center bg-white">
    {/* Heading */}
    <h1 className="text-4xl font-bold text-green-700 uppercase">
      {title}
    </h1>

    {/* Subheading */}
    <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
     {description}
    </p>

    {/* Button */}
    <div className="mt-8">
      <Link href={buttonLink}>
      <Button>
        {buttonText}
      </Button>
      </Link>
    </div>
  </section>
  );
}
