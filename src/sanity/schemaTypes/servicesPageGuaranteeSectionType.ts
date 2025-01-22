import { defineType } from "sanity";
import { SECTION_TYPES } from "@/sanity/constants";

export default defineType({
  name: SECTION_TYPES.SERVICES_PAGE_GUARANTEE_SECTION_TYPE,
  type: "object",
  title: "Services Page Guarantee Section",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),

    },
    {
      name: "description",
      type: "text",
      title: "Description",
      validation: (Rule) => Rule.required(),

    },
    {
      name: "backgroundImage",
      type: "image",
      title: "Image",
      validation: (Rule) => Rule.required(),

      options: {
        hotspot: true, // Enables image cropping
      },
    },
    {
      name: "buttonText",
      type: "string",
      title: "Button Text",
      validation: (Rule) => Rule.required(),

    },
    {
      name: "buttonLink",
      type: "url",
      title: "Button Link",
      validation: (Rule) => Rule.required(),

    },

    {
      name: "language",
      type: "string",
      validation: (rule) => rule.required(),
    },
  ],
  
});
