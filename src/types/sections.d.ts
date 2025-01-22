 type HomePageHeroSectionType = BaseSection & {
  subtitle?: string;
  backgroundImage: Image;
};

type HomePageProgramSectionType = BaseSection & {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

type HomePageWithLocationsSectionsType = SectionItem & {
  image: Image;
};

type HomePageWithLocationsSectionType = BaseSection & {
  subtitle?: string;
  image: Image;
  sections: HomePageWithLocationsSectionsType[];
};
type HomePageNorthAmericaCoverageSectionStatisticsType = SectionItem  
type HomePageNorthAmericaCoverageSectionType = BaseSection & {
  sections: HomePageNorthAmericaCoverageSectionStatisticsType[];
  mapImage: Image;
}

type ServiceType={
  service_icon: Image,
  service_name: string,
  service_description: string;
  _key: string;
}
type HomePageServiceCategorySectionType = BaseSection & {
  lawn_care_services:Array<ServiceType>,
  insect_control_services: Array<ServiceType>
  []
}


type ServicesHeroSectionType = HomePageHeroSectionType;

type LearnPageHeroSectionsType = SectionItem & {
  backgroundImage: Image;
  buttonLink: string;
  buttonText: string;
};

type LearnPageHeroSectionType = BaseSection & {
  sections: LearnPageHeroSectionsType[];
  subtitle: string;
};

type ServicesPageCustomerCustomerStoriesReviewSectionsType = SectionItem & {
  rating: number;
  content: string;
  author: string;
  date: string;
  authorImage?: Image;
};

type ServicesPageCustomerSuccessStoriesSectionType = BaseSection & {
  reviews: CustomerStoriesReviewSectionType[];
};

type ServicesPageGuaranteeSectionType = BaseSection & {
  description: string;
  backgroundImage: Image;
  buttonText: string;
  buttonLink: string;
};

type ServicesPageLearnYourLawnSectionsType = SectionItem & {
  image?: Image;
  url: string;
};

type ServicesPageLearnYourLawnSectionType = BaseSection & {
  description: string;
  cta?: CTA;
  sections: ServicesLearnYourLawnSectionsType[];
};

type ServicesPageWeedControlServiceSectionType = BaseSection & {
  sections: SectionItem[];
};

type ServicesPageWhyDoINeedThisSectionType = BaseSection & {
  description: BlockContent[];
  sections: SectionItem[];
  video?: string;
};

type Franchise = {
  franchise_name: string;
  path: Slug;
};

type Page = {
  title: string;
  path: Slug;
};

type Section =
  | HomePageHeroSectionType
  | HomePageServiceCategorySection
  | ServicesPageHero
  | ServicesWeedControlServiceSectionType
  | ServicesWhyDoINeedThisSectionType
  | ServicesGuaranteeSectionType
  | ServicesCustomerSuccessStoriesSectionType
  | ServicesLearnYourLawnSectionType
  | LearnPageHeroSectionType;
