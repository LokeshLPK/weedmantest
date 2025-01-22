/* eslint-disable @typescript-eslint/no-explicit-any */

import { DEFAULT_LANGUAGE } from '@/constants';
import { sanityFetch } from '@/sanity/lib/live';
import {
    DEFAULT_PAGE_QUERY, DEFAULT_PAGE_TITLE_QUERY, IS_FRANCHISE_EXIST_QUERY, PAGE_QUERY,
    PAGE_TITLE_QUERY, PAGE_TITLE_ZONE_QUERY, PAGE_ZONE_QUERY
} from '@/sanity/lib/queries';

// Utility function to fetch franchise existence
export const fetchFranchiseExistence = async (franchise: string) => {
  const res = await sanityFetch({
    query: IS_FRANCHISE_EXIST_QUERY,
    params: { franchise },
  });
  return res.data;
};

// Utility function to fetch page data
export const fetchPageData = async ({
  query,
  queryParams,
}: {
  query: string;
  queryParams: Record<string, any>;
}) => {
  const { data } = await sanityFetch({ query, params: queryParams });
  return data;
};
 
export const selectQuery = ({
  queryType,
  franchise,
  countryCode,
  isFranchiseExist,
}: QuerySelectorParams) => {
  const isZoneQuery = countryCode && !isFranchiseExist;
  const isFranchiseQuery = franchise && isFranchiseExist;

  if (queryType === "title") {
    if (isZoneQuery) return PAGE_TITLE_ZONE_QUERY;
    return isFranchiseQuery ? PAGE_TITLE_QUERY : DEFAULT_PAGE_TITLE_QUERY;
  }

  if (isZoneQuery) return PAGE_ZONE_QUERY;
  if (isFranchiseQuery) return PAGE_QUERY;
  return DEFAULT_PAGE_QUERY;
};

// Common logic to prepare query parameters
export const prepareQueryParams = ({
  language,
  franchise,
  countryCode,
  isFranchiseExist,
  sub_page
}: {
  language: string;
  franchise?: string;
  countryCode: string | null;
  isFranchiseExist: boolean;
  sub_page: string | null
}) => {
  const queryParams: APIQueryParams = {
    language: language || DEFAULT_LANGUAGE,
    countryCode,
  };
  if(sub_page){
    queryParams.sub_page=sub_page;
  }

  if (franchise && isFranchiseExist) {
    queryParams.franchise = franchise;
  }



  return queryParams;
};

export const getCountryCode = async (headers: Headers) => {
  return headers.get("X-Country-Code");
};
 

