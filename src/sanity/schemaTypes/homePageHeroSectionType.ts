import { defineType, Rule } from "sanity"
import { SECTION_TYPES } from "@/sanity/constants";
 
export default defineType({
  name: SECTION_TYPES.HOME_PAGE_HERO_SECTION_TYPE,
  type: 'object',
  title: 'Home Page Hero Section',
  fields: [
  
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The main title displayed in the hero section.',
      validation: Rule => Rule.required().warning('Keep the title concise.')
    },
    {
      name: 'subtitle',
      type: 'text',
      title: 'Subtitle',
      description: 'A brief subtitle or tagline.',
      validation: Rule => Rule.warning('Keep the subtitle concise.')
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      description: 'The main background image for the hero section.',
      options: {
        hotspot: true // Enables image cropping
      },
      validation: Rule => Rule.required().warning('A background image is required.')
    },

   {
         name: "language",
         type: "string",
         validation: (rule: Rule) => rule.required(),
    },
  ],

   
})