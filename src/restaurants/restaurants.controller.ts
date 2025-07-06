import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  InternalServerErrorException,
  Query,
} from '@nestjs/common'
import { RestaurantsService } from './restaurants.service'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    try {
      return await this.restaurantsService.create(createRestaurantDto)
    } catch (error: any) {
      // Check for Mongoose error
      if (error.name && error.name === 'ValidationError') {
        throw new BadRequestException(`Validation error: ${error.message}`)
      }
      // Other Mongoose errors (like duplicate key)
      if (error.name && error.name === 'MongoError') {
        throw new BadRequestException(`Database error: ${error.message}`)
      }
      // Generic error
      throw new InternalServerErrorException(
        `An error occurred while creating the restaurant: ${error.message}`,
      )
    }
  }

  @Get()
  async findAll(@Query('cuisine') cuisine?: string) {
    try {
      return await this.restaurantsService.findAll(cuisine)
    } catch (error: any) {
      // Check for Mongoose error
      if (error.name && error.name === 'ValidationError') {
        throw new BadRequestException(`Validation error: ${error.message}`)
      }
      // Generic error
      throw new InternalServerErrorException(
        `An error occurred while fetching restaurants: ${error.message}`,
      )
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.restaurantsService.findOne(id)
    } catch (error: any) {
      // Check for Mongoose error
      if (error.name && error.name === 'ValidationError') {
        throw new BadRequestException(`Validation error: ${error.message}`)
      }
      // Generic error
      throw new InternalServerErrorException(
        `An error occurred while fetching the restaurant: ${error.message}`,
      )
    }
  }

  @Get('nearby/:id')
  async findNearby(@Param('id') id: string) {
    try {
      return await this.restaurantsService.findNearby(id)
    } catch (error: any) {
      // Check for Mongoose error
      if (error.name && error.name === 'ValidationError') {
        throw new BadRequestException(`Validation error: ${error.message}`)
      }
      // Generic error
      throw new InternalServerErrorException(
        `An error occurred while finding nearby restaurants: ${error.message}`,
      )
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    try {
      return await this.restaurantsService.update(id, updateRestaurantDto)
    } catch (error: any) {
      // Check for Mongoose error
      if (error.name && error.name === 'ValidationError') {
        throw new BadRequestException(`Validation error: ${error.message}`)
      }
      // Generic error
      throw new InternalServerErrorException(
        `An error occurred while updating the restaurant: ${error.message}`,
      )
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.restaurantsService.remove(id)
    } catch (error: any) {
      // Check for Mongoose error
      if (error.name && error.name === 'ValidationError') {
        throw new BadRequestException(`Validation error: ${error.message}`)
      }
      // Generic error
      throw new InternalServerErrorException(
        `An error occurred while deleting the restaurant: ${error.message}`,
      )
    }
  }
}
