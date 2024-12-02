export type PropertyContentResponse = {
  [id: string] : PropertyContentModel
}

export type PropertyContentModel = {
  address_line: string,
  catalog: {
    brand: string,
    category: string,
    chain: string,
    city: string,
    fax: string,
    hero_image_url: {
      lg: string,
      md: string,
      ori: string,
      sm: string,
      th: string,
    },
    phone: string,
    postal_code: string,
    review_count: number,
    review_rating: number,
    star_rating: number,
  },
  country_code: string,
  general_info: string | null,
  id: string,
  image: string | null,
  important_info: string | null,
  latitude: number,
  longitude: number,
  name: string,
  name_suffix: string,
  room: { [id: string]:  RoomResponse }
}

type RoomResponse = {
  amenities: { [id: string]: RoomAmenitiesResponse },
  area: {
    square_feet: number,
    square_meters: number,
  },
  bed_groups: { [id: string]:  BedGroupResponse },
  descriptions: {
    overview: string,
  },
  id: string,
  images: Array<{
    caption: string,
    category: number,
    hero_image: boolean,
    links: { [dimension: string]: {
      href: string,
      method: string,
    }},
  }>,
  name: string,
  occupancy: {
    age_categories: { [name: string]: {
      name: string,
      minimum_age: number,
    }},
    max_allowed: {
      adults: number,
      children: number,
      total: number,
    }
  }
}

type RoomAmenitiesResponse = {
  categories: string[] | undefined,
  id: string,
  name: string,
  value: string | undefined,
}

type BedGroupResponse = {
  configuration: Array<{
    size: string,
    type: string,
    quantity: string,
  }>,
  description: string,
  id: string,
}