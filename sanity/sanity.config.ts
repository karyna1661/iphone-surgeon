import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'Iphone-Surgeon',
  title: 'iPhone Surgeon CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-15',
  basePath: '/studio',
  plugins: [
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
