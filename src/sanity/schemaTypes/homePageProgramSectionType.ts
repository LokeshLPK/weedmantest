import { defineType, Rule } from "sanity";
import { SECTION_TYPES } from "@/sanity/constants";

export default defineType({
  name: SECTION_TYPES.HOME_PAGE_PROGRAM_SECTION_TYPE,
  type: "object",
  title: "Home Page Program Section",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "The main title displayed in the hero section.",
      validation: (Rule) =>
        Rule.required(),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "A brief description or tagline.",
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
        name: "language",
        type: "string",
        validation: (rule: Rule) => rule.required(),
    },
  ],

  
});
