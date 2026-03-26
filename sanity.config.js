import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schema from './sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'Onda Yatırım Panel',
  projectId: 'k8cd67dp', 
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: {
    types: schema, // Köşeli parantezleri [] kaldırdık, çünkü 'schema' zaten bir dizi.
  },
})
