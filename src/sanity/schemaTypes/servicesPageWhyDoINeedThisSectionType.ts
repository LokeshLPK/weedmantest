import { defineType } from "sanity";
import { SECTION_TYPES } from "@/sanity/constants";

export default defineType({
  name: SECTION_TYPES.SERVICES_PAGE__WHY_DO_I_NEED_THIS,
  type: "object",
  title: "Services Page Why Do I Need This Section",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "The main heading of the section.",
      validation: Rule => Rule.required()

    },
    {
      name: "description",
      type: "array",
      title: "Description",
      description: "A rich text description explaining the benefits.",
      
      of: [{ type: "block" }],
      validation: Rule => Rule.required()

    },
    {
      name: "sections",
      type: "array",
      title: "Benefits",
      description: "A list of benefits highlighting key points.",
      validation: Rule => Rule.required(),
      of: [
        {
          type: "object",
          name: "benefit",
          title: "Benefit",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Benefit Title",
              description: "The key title or heading for the benefit.",
              validation: Rule => Rule.required()

            },
            {
              name: "description",
              type: "text",
              title: "Benefit Description",
              description: "A detailed description of the benefit.",
              validation: Rule => Rule.required()

            },
          ],
        },
      ],
    },
    {
      name: "video",
      type: "url",
      title: "Video URL",
      description: "The URL of the embedded video.",
      validation: Rule => Rule.required()

    },

    {
      name: "language",
      type: "string",
      validation: (rule) => rule.required(),

    },
  ],

   
});
