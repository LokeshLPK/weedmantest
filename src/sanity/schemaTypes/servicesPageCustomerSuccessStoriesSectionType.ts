import { defineType } from "sanity";
import { SECTION_TYPES } from "@/sanity/constants";

export default defineType({
  name: SECTION_TYPES.SERVICES_PAGE_CUSTOMER_SCUSSESS_STORIES_SECTION_TYPE,
  type: "object",
  title: "Services Page Customer Success Stories Section",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Section Title",
      description: "Title for the customer success stories section",
      validation: (Rule) => Rule.required(),

    },
    {
      name: "reviews",
      type: "array",
      title: "Reviews",
      validation: (Rule) => Rule.required(),

      of: [
        {
          type: "object",
          fields: [
            {
              name: "rating",
              type: "number",
              title: "Rating",
              description: "Rating out of 5 stars",
              validation: (Rule) => Rule.min(1).max(5),
            },

            {
              name: "title",
              type: "string",
              title: "Review Title",
              description: "Short title for the review",
              validation: (Rule) => Rule.required(),

            },
            {
              name: "content",
              type: "text",
              title: "Review Content",
              description: "The full content of the review",
              validation: (Rule) => Rule.required(),

            },
            {
              name: "author",
              type: "string",
              title: "Author Name",
              description: "Name of the person who wrote the review",
              validation: (Rule) => Rule.required(),

            },
            {
              name: "date",
              type: "date",
              title: "Date",
              description: "Date the review was written",
              validation: (Rule) => Rule.required(),

            },
            {
              name: "authorImage",
              type: "image",
              title: "Author Image",
              description: "Optional image of the review author",
              validation: (Rule) => Rule.required(),

            },
          ],
        },
      ],
    },

    {
      name: "language",
      type: "string",
      validation: (rule) => rule.required(),
    },
  ],
  
});
