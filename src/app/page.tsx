/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryParams } from "next-sanity";
import { headers } from "next/headers";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NotFound from "@/components/NotFound";
import PageContent from "@/components/PageContent";
import { DEFAULT_LANGUAGE } from "@/constants";
import { prepareQueryParams, selectQuery } from "@/lib/api";
import { sanityFetch } from "@/sanity/lib/live";

export async function generateMetadata() {
  const headersList = await headers();

  const countryCode = headersList.get("X-Country-Code");
  const query = selectQuery({
    queryType: "title",
    countryCode,
    isFranchiseExist: false,
  });
  const queryParams = prepareQueryParams({
    language: DEFAULT_LANGUAGE,
    countryCode,
    isFranchiseExist: false,
    sub_page: "/",
  });

  const { data } = await sanityFetch({
    query: query,
    params: queryParams,
  });

  return {
    title: data?.title,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const headersList = await headers();
  const countryCode = headersList.get("X-Country-Code");

  const query = selectQuery({
    queryType: "page",
    countryCode,
    isFranchiseExist: false,
  });
  const queryParams = prepareQueryParams({
    language: DEFAULT_LANGUAGE,
    countryCode,
    isFranchiseExist: false,
    sub_page: "/",
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
      <div id="map" />

      <Header params={params} />
      <PageContent {...data} key={data._id} />
      <Footer />
    </>
  );
}
