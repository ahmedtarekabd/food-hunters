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
import { ApiProperty } from '@nestjs/swagger'

class LocationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(['Point'])
  type: 'Point'

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsNumber({}, { each: true })
  coordinates: number[]
}

export class CreateRestaurantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_en: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_ar: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  cuisines: string[]

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto
}
