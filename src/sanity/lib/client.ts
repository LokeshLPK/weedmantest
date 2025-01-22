import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, 
  stega: { studioUrl: "http://localhost:4000/studio" },
  token: writeToken,
  
})

