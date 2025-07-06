import {
  IsArray,
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
  ArrayMinSize,
  IsIn,
  ValidateNested,
  IsNumber,
  ArrayMaxSize,
} from 'class-validator'
import { Type } from 'class-transformer'

class LocationDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['Point'])
  type: 'Point'

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsNumber({}, { each: true })
  coordinates: number[]
}

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name_en: string

  @IsString()
  @IsNotEmpty()
  name_ar: string

  @IsString()
  @IsNotEmpty()
  slug: string

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  cuisines: string[]

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto
}
