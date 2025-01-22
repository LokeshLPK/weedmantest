import { defineType } from "sanity";
import { SECTION_TYPES } from "@/sanity/constants";

export default defineType({
    name: SECTION_TYPES.SERVICES_PAGE_LEARN_YOUR_LAWN_SECTION_TYPE,
    type: 'object',
    title: 'Services Page Learn Your Lawn Section',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        description: 'The main title of the section.',
        validation: Rule => Rule.required()

      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        description: 'A brief description for the section.',
        validation: Rule => Rule.required()

      },
      {
        name: 'cta',
        type: 'object',
        title: 'Call to Action',
        fields: [
          {
            name: 'text',
            type: 'string',
            title: 'Button Text',
            validation: Rule => Rule.required()

          },
          {
            name: 'url',
            type: 'url',
            title: 'Button URL',
            validation: Rule => Rule.required()

          },
        ],
      },
      {
        name: 'sections',
        type: 'array',
        title: 'Articles',
        validation: Rule => Rule.required(),
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                type: 'string',
                title: 'Article Title',
                validation: Rule => Rule.required()

              },
              {
                name: 'image',
                type: 'image',
                title: 'Image',
                validation: Rule => Rule.required(),
                options: {
                  hotspot: true,
                },
              },
              {
                name: 'url',
                type: 'url',
                title: 'Article URL',
                validation: Rule => Rule.required()
              },
            ],
          },
           
        ],
      },
      {
        name: 'language',
        type: 'string',
        validation: (rule) => rule.required(),
    },
    ],
    
  })