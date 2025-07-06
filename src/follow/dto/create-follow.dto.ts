import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateFollowDto {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  restaurantId: string
}
