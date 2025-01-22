"use client";

import InputAddressComponent from "@/components/InputAddressComopnent";

export default function HomePageHeroSection(props: HomePageHeroSectionType) {
  const { backgroundImage, title, subtitle } = props;

  return (
           <section className="relative min-h-[600px] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0, 101, 58, 0.104), rgba(5, 64, 39, 0.4)),
            url('${backgroundImage.asset.url}')`,
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:py-20">
        <div className="max-w-2xl space-y-6 mt-12 sm:mt-24">
          <h1 className="font-bold tracking-tight text-white">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90">
            {subtitle}
          </p>
          <div className="space-y-0">
            <p className="text-white font-weight-400">
              Enter your address to get started on a free quote
            </p>
            <InputAddressComponent
              placeholder="Address"
              buttonText="GET STARTED"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
