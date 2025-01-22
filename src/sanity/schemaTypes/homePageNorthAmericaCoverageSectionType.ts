import { defineType } from "sanity";
import { SECTION_TYPES } from "@/sanity/constants";

export default defineType({
  name: SECTION_TYPES.HOME_PAGE_NORTH_AMERICA_COVERAGE_SECTION_TYPE,
  type: "object",
  title: "Home Page North America Coverage",
  fields: [
    {
      name: "sections",
      type: "array",
      title: "Statistics",
      validation: (Rule) => Rule.required(),

      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Number",

              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "string",
              title: "Label",

              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: "title",
      type: "string",
      title: "Headline",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "mapImage",
      type: "image",
      title: "Map Image",
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
  ],
});
