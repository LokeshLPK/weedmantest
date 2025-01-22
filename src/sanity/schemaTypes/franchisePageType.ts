import { defineType } from "sanity";
import pageContentType from "./pageContentType";

export default defineType({
  type: "document",
  title: "Page",
  name: "franchisePageType",
  fields: [
    {
      name: "franchise_type",
      title: "Franchise",
      type: "reference",
      to: [{ type: "weedManFranchiseType" }],
    },
    ...pageContentType.fields,
  ],
  preview: pageContentType.preview,
});
