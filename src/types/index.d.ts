

 
declare type FranchisePageType = {
  _id: string;
  page_type: { _ref: string };
  franchise_type: { _ref: string };
  language: string;
  title: string;
  page_type: { _ref: string };
  sections: Section[];
};

declare type PageContentType = {
  _id: string;
  page_type: { _ref: string };
  franchise_type: { _ref: string };
  language: string;
  title: string;
  page_type: { _ref: string };
  sections: Section[];
  assigned_franchises: Array<FranchiseReference>;
};

declare type WeedManFranchiseType = {
  franchise_name: string;
  path: { current: string };
  zip_postal_code: string;
  _id: string;
  _type: "weedManFranchiseType";
  _key: string;
};

type FranchiseReference = {
  _key: string;
  _ref: string;
  _type: string;
};

declare type QueryType = 'title' | 'page';

declare type QuerySelectorParams = {
  queryType: QueryType;
  franchise?: string;
  countryCode?: string | null;
  isFranchiseExist?: boolean;
}

declare type APIQueryParams =  {
  language: string;
  sub_page?: string;
  countryCode?: string | null;
  franchise?: string;
}

