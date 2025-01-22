import { defineType } from "sanity"
import { SECTION_TYPES } from "@/sanity/constants";

export default defineType({
    name: SECTION_TYPES.SERVICES_PAGE_WEED_CONTROL_SERVICE_SECTION_TYPE,
    type: 'object',
    title: 'Services Page Weed Control Service Section',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Headline',
        description: 'The main title or headline of the service.',
        validation: Rule => Rule.required()

      },
      {
        name: 'sections',
        type: 'array',
        title: 'Service Sections',
        validation: Rule => Rule.required(),
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                type: 'string',
                title: 'Section Title',
                validation: Rule => Rule.required()

              },
              {
                name: 'description',
                type: 'text',
                title: 'Section Description',
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
    
  });
  
  