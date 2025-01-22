
import Image from "next/image";

export default function HomePageWithLocationsSection(props: HomePageWithLocationsSectionType) {
  const { sections = [], title, subtitle,image } = props;
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex justify-center">
            <Image
              src={image.asset.url}
              alt="Hero Image"
              width={600}
              height={400}
             />
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-green-900 leading-tight mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-700 mb-6">{subtitle}</p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={feature.image.asset.url}
                      alt={`${feature.title} Icon`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
