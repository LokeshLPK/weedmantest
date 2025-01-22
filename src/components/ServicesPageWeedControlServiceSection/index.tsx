 import React from "react";

export default function ServicesPageWeedControlServiceSection(props: ServicesPageWeedControlServiceSectionType) {
  const { title, sections } = props;
  return (
    <section className="py-8 sm:py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-2xl sm:text-3xl font-bold  text-green-700 mb-6 sm:mb-8">
        {title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sections?.map((section: SectionItem) => (
          <div
            key={section._key}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
              {section.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
}
