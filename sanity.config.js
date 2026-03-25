import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schema from './sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'Onda Yatırım Panel',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  basePath: '/studio',
  plugins: [deskTool()],
  schema: { types: [schema] },
})
