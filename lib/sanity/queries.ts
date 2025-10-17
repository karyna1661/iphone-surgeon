import { sanityFetch } from './client'
import { urlFor } from './imageUrlBuilder'
import type { GalleryItem, TestimonialItem, ServiceItem, GalleryItemRaw, TestimonialItemRaw } from './types'

const galleryQuery = `*[_type == "gallery"] | order(order asc, _createdAt desc) {
  _id,
  "id": _id,
  "deviceModel": title,
  repairType,
  turnaroundTime,
  "beforeImage": beforeImage,
  "afterImage": afterImage,
  description
}`

const testimonialsQuery = `*[_type == "testimonial"] | order(featured desc, order asc, _createdAt desc) {
  _id,
  "id": _id,
  name,
  role,
  handle,
  quote,
  "avatar": avatar
}`

const servicesQuery = `*[_type == "service"] | order(featured desc, order asc, _createdAt desc) {
  _id,
  "id": _id,
  title,
  description,
  icon,
  featured
}`

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const rawData = await sanityFetch<GalleryItemRaw[]>({
      query: galleryQuery,
      revalidate: 3600, // Revalidate every hour
    })
    
    // Transform image objects to URLs
    return rawData.map(item => ({
      ...item,
      beforeImage: item.beforeImage ? urlFor(item.beforeImage).width(1200).quality(90).format('webp').url() : '',
      afterImage: item.afterImage ? urlFor(item.afterImage).width(1200).quality(90).format('webp').url() : ''
    }))
  } catch (error) {
    console.warn('Failed to fetch gallery items from Sanity:', error)
    return [] // Return empty array as fallback
  }
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const rawData = await sanityFetch<TestimonialItemRaw[]>({
      query: testimonialsQuery,
      revalidate: 3600,
    })
    
    // Transform avatar image object to URL
    return rawData.map(item => ({
      ...item,
      avatar: item.avatar ? urlFor(item.avatar).width(200).height(200).quality(85).url() : ''
    }))
  } catch (error) {
    console.warn('Failed to fetch testimonials from Sanity:', error)
    return [] // Return empty array as fallback
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    return await sanityFetch<ServiceItem[]>({
      query: servicesQuery,
      revalidate: 3600,
    })
  } catch (error) {
    console.warn('Failed to fetch services from Sanity:', error)
    return [] // Return empty array as fallback
  }
}
