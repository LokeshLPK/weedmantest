import { QueryParams } from 'next-sanity';
import { cookies } from 'next/headers';

export const generatePath = async ({
  language,
  franchise,
  countryCode,
  subPage,
  goTo,
}: {
  language: string;
  franchise?: string;
  countryCode?: string | null;
  subPage?: string;
  goTo?: string;
}) => {
  const DEFAULT_LANGUAGE = "en"; // Replace with the actual default language if available
  const cookiesInstance = await cookies();
  const allFranchises = JSON.parse(
    cookiesInstance.get("franchises")?.value || "[]"
  );

  const isFranchiseExists = allFranchises.some(
    (item: { path: string }) => item.path === franchise
  );

  // Initialize the base path with language
  let path = `/${language || DEFAULT_LANGUAGE}`;

  // Append franchise or countryCode if provided and goTo is not specified
  if ((franchise || countryCode) && !goTo) {
    path += `/${franchise || countryCode}`;
  }

  // Append goTo if specified
  if (goTo) {
    if (isFranchiseExists && franchise) {
      path += `/${franchise}/${goTo}`;
    } else if (countryCode) {
      path += `/${countryCode}/${goTo}`;
    } else {
      path += `/${goTo}`;
    }
    return path;
  }

  // Append subPage if provided and goTo is not specified
  if (subPage) {
    path += `/${subPage}`;
  }

  return path;
};


export const generateNavLink = async (
  language: string,
  franchise: string | undefined,
  countryCode: string | null,
  label: string,
  route: string
) => {
  const href = await generatePath({
    language,
    franchise,
    countryCode,
    goTo: route,
  });
  
  return { href, label };
};


export const generateLanguageLinks = async (
    i18n: { languages: { id: string; title: string }[] },
    params: QueryParams,
    countryCode: string | null
  ) => {
    const {  franchise, sub_page } = params;
    
    return Promise.all(i18n.languages.map(async (lang) => ({
      href: countryCode && !franchise
        ? `/${lang.id}/`
        : await generatePath({
            language: lang.id,
            franchise,
            countryCode,
            subPage: sub_page,
          }),
      label: lang.title,
      id: lang.id,
    })));
  };
  
  export const getLogoHref = async (
    language: string,
    franchise: string | undefined,
    countryCode: string | null
  ) => {
    return countryCode && franchise === countryCode
      ? `/${language}/`
      : await generatePath({
          language,
          franchise,
          countryCode,
          goTo: "/",
        });
  };