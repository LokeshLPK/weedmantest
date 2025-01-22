import { defineType } from 'sanity'

export default defineType({
  type: 'document',
  title: 'Zone',
  name: 'zoneType',
  fields: [
    {
      type: 'string',
      title: 'Zone',
      name: 'zone_name'
    },
    {
      type: 'string',
      title: 'Code',
      name: 'zone_code'
    },
     
  ]
})
