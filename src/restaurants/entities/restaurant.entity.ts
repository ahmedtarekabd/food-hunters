import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Cuisines } from 'src/lib/enums/cuisines'

export type RestaurantDocument = HydratedDocument<Restaurant>

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true })
  name_en: string

  @Prop({ required: true })
  name_ar: string

  @Prop({ required: true, unique: true })
  slug: string

  @Prop({
    type: [String],
    enum: Cuisines,
    validate: {
      validator: (arr: string[]) =>
        Array.isArray(arr) && arr.length >= 1 && arr.length <= 3,
      message: 'Cuisines array must have between 1 and 3 items',
    },
  })
  cuisines: string[]

  @Prop({
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  })
  location: {
    type: 'Point'
    coordinates: number[]
  }
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)
RestaurantSchema.index({ location: '2dsphere' }) // For geospatial queries
