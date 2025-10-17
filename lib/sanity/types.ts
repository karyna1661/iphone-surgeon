export interface GalleryItem {
  id: string
  deviceModel: string
  repairType: string
  turnaroundTime: string
  beforeImage: string
  afterImage: string
  description?: string
}

export interface GalleryItemRaw {
  _id: string
  id: string
  deviceModel: string
  repairType: string
  turnaroundTime: string
  beforeImage: any
  afterImage: any
  description?: string
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  handle: string
  quote: string
  avatar?: string
}

export interface TestimonialItemRaw {
  _id: string
  id: string
  name: string
  role: string
  handle: string
  quote: string
  avatar?: any
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  featured?: boolean
}
