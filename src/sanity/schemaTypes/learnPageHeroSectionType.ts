import { defineType } from "sanity";
import { SECTION_TYPES } from "@/sanity/constants";
import { Rule } from "sanity";

export default defineType({
  name: SECTION_TYPES.LEARN_PAGE_HERO_SECTION_TYPE,
  title: "Learn Page Hero Section",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),

    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),

    },
    {
      name: "sections",
      title: "Resources",
      type: "array",
      validation: (Rule) => Rule.required(),

      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Resource Title",
              type: "string",
              validation: (Rule) => Rule.required(),

            },
            {
              name: "description",
              title: "Resource Description",
              type: "text",
              validation: (Rule) => Rule.required(),

            },
            {
              name: "buttonText",
              title: "Button Text",
              type: "string",
              validation: (Rule) => Rule.required(),

            },
            {
              name: "buttonLink",
              title: "Button Link",
              type: "url",
              validation: (Rule) => Rule.required(),

            },
            {
              name: "backgroundImage",
              title: "Background Image",
              type: "image",
              validation: (Rule) => Rule.required(),

              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },

    {
             name: "language",
             type: "string",
             validation: (rule: Rule) => rule.required(),
        },
  ],
 });
