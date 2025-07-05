export class CreateRestaurantDto {
  name_en: string
  name_ar: string
  slug: string
  cuisines: string[]
  location: {
    type: 'Point'
    coordinates: number[]
  }
}
