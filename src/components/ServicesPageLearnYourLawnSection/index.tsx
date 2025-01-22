import { Button } from "@/components/ui/button"; // Import ShadCN Button
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function ServicesPageLearnYourLawnSection(props: ServicesPageLearnYourLawnSectionType) {
  const { title, description, cta, sections } = props;
   return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">

        <div className="text-center mb-8 flex">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-6 sm:mb-8 flex-1 text-left">
            {title}
          </h1>
          <div className="flex flex-col text-left">
            <p className="text-gray-600 max-w-2xl">{description}</p>
            {cta && (
              <Link href={cta.url}>
                <Button className="mt-4" variant="default">
                  {cta.text}
                  <FaArrowRight className="text-green-800" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections?.map((article: ServicesPageLearnYourLawnSectionsType, index: number) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent
                className="flex flex-col-reverse"
                style={{
                  backgroundImage: `
                linear-gradient(to bottom, rgba(0, 101, 58, 0.104), rgba(5, 64, 39, 0.4)),
                url('${article?.image?.asset.url}')`,
                  backgroundPosition: "center 40%",
                  height: 500,
                }}
              >
                <div className="flex justify-between">
                  <CardTitle className="text-lg font-weight-900 mb-2 text-white  max-w-2xl">
                    {article.title}
                  </CardTitle>
                  <Link
                    href={article.url}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    <FaArrowRight
                      style={{ color: "#C5DC6E", transform: "rotate(-45deg)" }}
                      size={30}
                    />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
