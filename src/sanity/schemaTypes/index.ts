import { type SchemaTypeDefinition } from "sanity";
 
import page from "@/sanity/schemaTypes/page";
import pageContentType from "@/sanity/schemaTypes/pageContentType";
import { allSections } from "@/sanity/schemaTypes/sections";
import weedManFranchiseType from "@/sanity/schemaTypes/weedManFranchiseType";
import zoneType from "@/sanity/schemaTypes/zoneType";
import franchisePageType from "./franchisePageType";
import zonePageType from "./zonePageType";
import usersType from "./usersType";
 
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page,
    pageContentType,
    weedManFranchiseType,
    zoneType,
    franchisePageType,
    zonePageType,
    usersType,
    ...allSections
  ],
};
