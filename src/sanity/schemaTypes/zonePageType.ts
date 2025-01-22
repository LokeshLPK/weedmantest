import { defineType } from "sanity";
import pageContentType from "./pageContentType";

export default defineType({
  type: "document",
  title: "Page",
  name: "zonePageType",
  fields: [
    {
      name: "zone_type",
      title: "Zone",
      type: "reference",
      to: [{ type: "zoneType" }],
    },
    ...pageContentType.fields,
  ],
  preview: pageContentType.preview,
});
