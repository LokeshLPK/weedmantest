/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryParams } from 'next-sanity';
import { headers } from 'next/headers';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NotFound from '@/components/NotFound';
import PageContent from '@/components/PageContent';
import { fetchFranchiseExistence, fetchPageData, prepareQueryParams, selectQuery } from '@/lib/api';
import { client } from '@/sanity/lib/client';
import { ALL_FRANCHISE_QUERY } from '@/sanity/lib/queries';

import { i18n } from '../../../../languages';

export async function generateStaticParams() {
  const allLanguages = i18n.languages;
  const allFranchises =await client.fetch(ALL_FRANCHISE_QUERY)
  const staticParams = allFranchises.flatMap((franchise: any) =>
    allLanguages.map((language: {id: string}) => ({
      language : language.id,
      franchise: franchise.path,
    }))
  );
  return staticParams;

}


export async function generateMetadata({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const { language, franchise } = await params;
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
    sub_page: !isFranchiseExist ? franchise : "/",
  });
  const data = await fetchPageData({ query, queryParams });

  return {
    title: data?.title || "Not Found",
  };
}

export default async function Home({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const { language, franchise } = await params;
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
    sub_page: !isFranchiseExist ? franchise : "/",
  });

  const data = await fetchPageData({ query, queryParams });

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
