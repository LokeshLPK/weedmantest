import Image from "next/image";
import InputAddressComponent from "@/components/InputAddressComopnent";

export default function HomePageNorthAmericaCoverageSection(
  props: HomePageNorthAmericaCoverageSectionType
) {
  const { title, mapImage, sections = [] } = props;
  return (
    <section className="container mx-auto py-16 px-6">
      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center   pb-8">
        {sections.map((stat) => (
          <div key={stat._key} className="flex flex-col items-center">
            <h2 className="text-4xl	 font-bold text-green-800">{stat.title}</h2>
            <p className="text-sm  font-medium">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Main Content Section */}
      <div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text and Input */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B543F] leading-tight uppercase font-['athletic']">
              {title}
            </h1>
            <div className="space-y-0">
              <p className="text-black font-weight-400">
                Enter your address to get started on a free quote
              </p>
              <InputAddressComponent
                placeholder="Address"
                buttonText="GET STARTED"
              />
            </div>
          </div>

          {/* Right Column - Map */}
          <div>
            {mapImage && (
              <Image
                src={mapImage.asset.url}
                alt="Map of North America"
                className="w-full rounded-md"
                width={505}
                height={481}
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
