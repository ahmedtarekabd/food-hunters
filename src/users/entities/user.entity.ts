import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Cuisines } from 'src/lib/enums/cuisines'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string

  @Prop({ type: [String], enum: Cuisines })
  favoriteCuisines: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
