 
import { QueryParams } from 'next-sanity';
import { headers } from 'next/headers';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NotFound from '@/components/NotFound';
import PageContent from '@/components/PageContent';
import VisualEditWrapper from '@/components/VisualEditWrapper';
import { DEFAULT_LANGUAGE } from '@/constants';
import { prepareQueryParams, selectQuery } from '@/lib/api';
import { sanityFetch } from '@/sanity/lib/live';
 
import { i18n } from '../../../languages';


export async function generateStaticParams() {
  const allLanguages = i18n.languages;
  return allLanguages.map(i=>({language: i.id}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const { language = DEFAULT_LANGUAGE, franchise } = await params;
  const headersList = await headers();
  const countryCode = headersList.get("X-Country-Code");
  const query = selectQuery({
    queryType: "title",
    franchise,
    countryCode,
    isFranchiseExist: false,
  });
  const queryParams = prepareQueryParams({
    language,
    franchise,
    countryCode,
    isFranchiseExist: false,
    sub_page: "/",
  });

  const { data } = await sanityFetch({
    query,
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
  const { franchise, language = DEFAULT_LANGUAGE } = await params;

  const headersList = await headers();

  const countryCode = headersList.get("X-Country-Code");
  const query = selectQuery({
    queryType: "page",
    franchise,
    countryCode,
    isFranchiseExist: false,
  });

  const queryParams = prepareQueryParams({
    language,
    franchise,
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
      <Header params={params} />
      <VisualEditWrapper id={data._id} type={data._type} path="page">
        <PageContent {...data} />
      </VisualEditWrapper>
      <Footer />
    </>
  );
}
