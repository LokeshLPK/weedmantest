type Slug = {
  _type: "slug";
  current: string;
};

type ImageAsset = {
  _ref: string;
  _type: "reference";
  url: string;
};

type Image = {
  _type: "image";
  asset: ImageAsset;
  hotspot?: {
    x: number;
    y: number;
  };
};

type SectionItem = {
  title: string;
  description: string;
  _key: string;
};

type CTA = {
  text: string;
  url: string;
};

type BlockContent = {
  _type: "block";
  children: Array<{ _type: "span"; text: string }>;
};

type Path = {
  path: Slug;
};

type BaseSection = {
  _ref: string;
  _type: string;
  title: string;
  language: string;
};
