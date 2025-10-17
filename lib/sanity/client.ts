import { createClient } from '@sanity/client'
import type { SanityClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-15';

// Allow demo project ID for development and demo builds
// if (!projectId && process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'demo-project-id') {
//   throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
// }

export const client: SanityClient = createClient({
  projectId: projectId || 'demo-project-id',
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 3600, // 1 hour default
}: {
  query: string
  params?: Record<string, any>
  revalidate?: number | false
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate },
  })
}
