import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  favoriteCuisines: string[]
}
