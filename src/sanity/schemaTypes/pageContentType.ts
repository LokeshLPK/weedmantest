/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineType, Rule } from "sanity";
import { allSections } from "@/sanity/schemaTypes/sections";
// import SelectFranchiseModal from "@/components/SelectFranchiseModal";

export default defineType({
  name: "pageContentType",
  title: "Page Content",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Page Header",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    },

    {
      name: "page_type",
      type: "reference",
      to: [{ type: "page" }],
      validation: (rule: Rule) => rule.required(),
    },

    {
      name: "sections",
      type: "array",
      of: allSections.map((i) => ({
        type: i.type,
        name: i.name,
        fields: i.fields,
        title: i.title,
        groups: i.groups || [],
      })),

      // validation: (rule: Rule) =>
      //   rule.required().custom((sectionsArray: Array<Section>) => {
      //     const sectionTypes = sectionsArray?.map(
      //       (section: Section) => section._type
      //     );
      //     const uniqueSectionTypes = new Set(sectionTypes);

      //     if (sectionTypes?.length !== uniqueSectionTypes.size) {
      //       return "Duplicate sections are not allowed.";
      //     }

      //     return true;
      //   }),
    },

    {
      name: "language",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "assigned_franchises",
      type: "array",
      of: [{ type: "reference", to: [{ type: "weedManFranchiseType" }] }],
      hidden: true,
    },
  ],

  preview: {
    select: {
      title: "title",
      language: "language",
      pageType: "page_type.title",
    },
    prepare(select) {
      const { language, pageType } = select;
      return {
        title: pageType,
        subtitle: language.toUpperCase(),
      };
    },
  },
});
