import { defineType } from 'sanity'

export default defineType({
  type: 'document',
  title: 'Franchise',
  name: 'weedManFranchiseType',
  fields: [
    {
      type: 'string',
      title: 'Franchise',
      name: 'franchise_name',
      validation: Rule => Rule.required()
    },
    {
      type: 'slug',
      title: 'Slug',
      name: 'path',
      validation: Rule => Rule.required()
    },
    {
      type: 'string',
      title: 'Zip/Postal Code',
      name: 'zip_postal_code',
      validation: Rule => Rule.required()

    }
  ]
})
