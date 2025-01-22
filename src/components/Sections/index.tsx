/* eslint-disable @typescript-eslint/ban-ts-comment */
import HomePageHeroSection from "@/components/HomePageHeroSection";
import HomePageProgramSection from "@/components/HomePageProgramSection";
import HomePageWithLocationsSection from "@/components/HomePageWithLocationsSection";
import HomePageNorthAmericaCoverageSection from "@/components/HomePageNorthAmericaCoverageSection";

import ServicesPageWeedControlServiceSection from "@/components/ServicesPageWeedControlServiceSection";
import ServicesPageWhyDoINeedThisSection from "@/components/ServicesPageWhyDoINeedThisSection";
import ServicesPageGuaranteeSection from "@/components/ServicesPageGuaranteeSection";
import ServicesPageCustomerSuccessStoriesSection from "@/components/ServicesPageCustomerSuccessStoriesSection";
import ServicesPageLearnYourLawnSection from "@/components/ServicesPageLearnYourLawnSection";
import LearnPageHeroSection from "@/components/LearnPageHeroSection";

import { SECTION_TYPES } from "@/sanity/constants";
import HomePageServiceCategorySection from "../HomePageServiceCategorySection";
  
const Divider = () => (
  <div
    className="bg-orange-500 mb-10 mt-10 ml-10 mr-10"
    style={{ height: 1 }}
  />
);
 
type SectionsProps = {
  sections: Array<Section>;
};

const sectionComponents = {
  [SECTION_TYPES.HOME_PAGE_HERO_SECTION_TYPE]: HomePageHeroSection,
  [SECTION_TYPES.HOME_PAGE_PROGRAM_SECTION_TYPE]: HomePageProgramSection,
  [SECTION_TYPES.SERVICES_PAGE_HERO_SECTION_TYPE]: HomePageHeroSection,
  [SECTION_TYPES.HOME_PAGE_WITH_LOCATIONS_SECTION_TYPE]: HomePageWithLocationsSection,
  [SECTION_TYPES.HOME_PAGE_NORTH_AMERICA_COVERAGE_SECTION_TYPE]: HomePageNorthAmericaCoverageSection,
  [SECTION_TYPES.HOME_PAGE_SERVICE_CATEGORY_SECTION_TYPE]: HomePageServiceCategorySection,


  [SECTION_TYPES.SERVICES_PAGE_WEED_CONTROL_SERVICE_SECTION_TYPE]: ServicesPageWeedControlServiceSection,
  [SECTION_TYPES.SERVICES_PAGE__WHY_DO_I_NEED_THIS]: ServicesPageWhyDoINeedThisSection,
  [SECTION_TYPES.SERVICES_PAGE_GUARANTEE_SECTION_TYPE]: ServicesPageGuaranteeSection,
  [SECTION_TYPES.SERVICES_PAGE_CUSTOMER_SCUSSESS_STORIES_SECTION_TYPE]: ServicesPageCustomerSuccessStoriesSection,
  [SECTION_TYPES.SERVICES_PAGE_LEARN_YOUR_LAWN_SECTION_TYPE]: ServicesPageLearnYourLawnSection,
  [SECTION_TYPES.LEARN_PAGE_HERO_SECTION_TYPE]: LearnPageHeroSection,
  
};


export default function Sections({ sections=[] }: SectionsProps) {
   const renderSection = (section: Section) => {
    const SectionComponent = sectionComponents[section?._type];
    if (SectionComponent) {
      //@ts-ignore
      return <SectionComponent {...section} />;
    }
    return null;
  };

  return sections?.map((section: Section, index: number) => (
    <div key={section._type} className="mb-10">
      {index > 0 && <Divider />}
      {renderSection(section)}
      {index === sections.length - 1 && <Divider />}
    </div>
  ));
}
