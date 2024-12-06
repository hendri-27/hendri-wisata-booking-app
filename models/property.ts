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
  general_info: {
    descriptions: {
      dining: string,
      location: string,
      amenities: string,
    },
    spoken_languages: { [id: string]: {
      id: string,
      name: string,
    }}
  } | null,
  id: string,
  image: Array<{
    url: {
      lg: string,
      md: string,
      sm: string,
      th: string,
      ori: string,
    },
    group: string,
    caption: string,
  }> | null,
  important_info: {
    fees: {
      optional: string,
    },
    checkin: {
      begin_time: string,
      instructions: string,
    },
    checkout: {
      time: string,
    }
    policies: {
      know_before_you_go: string,
    }
  } | null,
  latitude: number,
  longitude: number,
  name: string,
  name_suffix: string,
  room: { [id: string]:  RoomResponse }
}

export type RoomResponse = {
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
  images: Array<ImageModel>,
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

export type ImageModel = {
  caption: string,
  category: number,
  hero_image: boolean,
  links: { [dimension: string]: {
    href: string,
    method: string,
  }},
}

export type RoomAmenitiesResponse = {
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