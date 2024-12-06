export type GroupAmenityModel = {
  title: string,
  icon: string,
  amenities: { [id: string]: {
    id: string,
    name: string,
    value: string | undefined,
  }},
  category: string,
}