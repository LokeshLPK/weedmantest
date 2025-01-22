/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryParams } from "next-sanity";
import { headers } from "next/headers";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NotFound from "@/components/NotFound";
import PageContent from "@/components/PageContent";
import {
  fetchFranchiseExistence,
  prepareQueryParams,
  selectQuery,
} from "@/lib/api";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_FRANCHISE_QUERY, ALL_PAGES } from "@/sanity/lib/queries";

import { i18n } from "../../../../../languages";

export async function generateStaticParams() {
  const allLanguages = i18n.languages;
  const allFranchises = await client.fetch(ALL_FRANCHISE_QUERY);
  const allSubPages = await client.fetch(ALL_PAGES);
  const staticParams = allFranchises.flatMap((franchise: any) =>
    allLanguages.flatMap((language: { id: string }) =>
      allSubPages.map((sub_page: { path: string }) => ({
        language: language.id,
        franchise: franchise.path,
        sub_page: sub_page.path, // Ensure `sub_page` is included
      }))
    )
  );
  return staticParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const { language, sub_page, franchise } = await params;
  const headersList = await headers();

  const countryCode = headersList.get("X-Country-Code");
  const isFranchiseExist = await fetchFranchiseExistence(franchise);
  const query = selectQuery({
    queryType: "title",
    franchise,
    countryCode,
    isFranchiseExist,
  });
  const queryParams = prepareQueryParams({
    language,
    franchise,
    countryCode,
    isFranchiseExist,
    sub_page,
  });

  const { data } = await sanityFetch({
    query,
    params: queryParams,
  });

  return {
    title: data?.title || "Not Found",
    description:
      data?.description ||
      "This page could not be found or does not have a description available.",
  };
}

export default async function Home({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const { language, sub_page, franchise } = await params;
  const headersList = await headers();

  const countryCode = headersList.get("X-Country-Code");
  const isFranchiseExist = await fetchFranchiseExistence(franchise);
  const query = selectQuery({
    queryType: "page",
    franchise,
    countryCode,
    isFranchiseExist,
  });
  const queryParams = prepareQueryParams({
    language,
    franchise,
    countryCode,
    isFranchiseExist,
    sub_page,
  });

  const { data } = await sanityFetch({
    query,
    params: queryParams,
  });

  if (!data) {
    return <NotFound params={params} />;
  }
  return (
    <>
      <Header params={params} franchise={data.franchise} />
      <PageContent {...data} />
      <Footer />
    </>
  );
}
