import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage
}`);

export const PAGE_PARAMS = `{
  _id,
  title,
  "franchise":franchise_type->franchise_name,
  _type,
   "pageType": page_type->title,
  language,
  "sections": sections[]{
    _id,
    _type,
    video,
    description,
    title,
    image{
    asset->{
        _id,
        url
      }
    },
    mapImage{
    asset->{
        _id,
        url
      }
    },
  "insect_control_services": insect_control_services[]{
  ...,
    service_icon{
    asset->{
        _id,
        url
      }
    }
  },
  "lawn_care_services": lawn_care_services[]{
  ...,
    service_icon{
    asset->{
        _id,
        url
      }
    }
  },

    "sections":sections[]{
    ...,
    description,
    title,
    image{
    asset->{
        _id,
        url
      }
    },
     backgroundImage{
      asset->{
        _id,
        url
      }
    },
    },
    "reviews":reviews[]{
    ...,
    authorImage{
    asset->{
        _id,
        url
      }
    },
    


    },
    subtitle,
    backgroundImage{
      asset->{
        _id,
        url
      }
    },
    buttonLink,
    buttonText,
    alignment,
    language,
  }
}`;

export const DEFAULT_PAGE_QUERY = defineQuery(
  `*[_type == "pageContentType" && language==$language && page_type->path.current == $sub_page ][0]${PAGE_PARAMS}`
);

export const PAGE_ZONE_QUERY = defineQuery(
  `*[_type == "zonePageType" && language==$language && page_type->path.current == $sub_page && (zone_type->zone_code == $countryCode )][0]${PAGE_PARAMS}`
);

export const PAGE_QUERY = defineQuery(
  `*[_type == "franchisePageType" && language==$language && page_type->path.current == $sub_page && (franchise_type->path.current == $franchise )][0]${PAGE_PARAMS}`
);

export const DEFAULT_PAGE_TITLE_QUERY =
  defineQuery(`*[_type == "pageContentType" && language==$language && page_type->path.current == $sub_page][0]{
  title,
}`);

export const PAGE_TITLE_ZONE_QUERY =
  defineQuery(`*[_type == "zonePageType" && language==$language && page_type->path.current == $sub_page][0]{
  title,
}`);

export const PAGE_TITLE_QUERY =
  defineQuery(`*[_type == "franchisePageType" && language==$language && page_type->path.current == $sub_page && (franchise_type->path.current == $franchise)][0]{
  title,
}`);

export const FRANCHISE_QUERY = `*[_type == "weedManFranchiseType" && lower(zip_postal_code) == $postalCode][0]`;

export const IS_FRANCHISE_EXIST_QUERY = `*[_type == "weedManFranchiseType" && path.current == $franchise][0]`;

export const IS_ZONE_EXIST_QUERY = `*[_type == "zoneType" && lower(zone_code) == $countryCode][0]`;

export const ALL_FRANCHISE_QUERY = `*[_type == "weedManFranchiseType"]{
"path":path.current
}`;

export const ALL_PAGES=`*[_type == "page"]{
"path":path.current
}`