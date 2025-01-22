import { defineType } from "sanity";
import { SECTION_TYPES } from "@/sanity/constants";

export default defineType({
  name: SECTION_TYPES.HOME_PAGE_WITH_LOCATIONS_SECTION_TYPE,
  type: "object",
  title: "Home Page with locations section",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Main Heading",
      validation: (Rule) => Rule.required(),

    },
    {
      name: "subtitle",
      type: "text",
      title: "Sub Heading",
      validation: (Rule) => Rule.required(),

    },
    {
      name: "image",
      type: "image",
      title: "Hero Image",
      validation: (Rule) => Rule.required(),

      options: {
        hotspot: true,
      },
    },
    {
      name: "sections",
      type: "array",
      title: "Features",
      validation: (Rule) => Rule.required(),

      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Feature Title",
              validation: (Rule) => Rule.required(),

            },
            {
              name: "description",
              type: "text",
              title: "Feature Description",
              validation: (Rule) => Rule.required(),

            },
            {
              name: "image",
              type: "image",
              title: "Feature Icon",
              validation: (Rule) => Rule.required(),

              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
  ],
});
