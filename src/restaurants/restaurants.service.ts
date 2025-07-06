import { Injectable } from '@nestjs/common'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Restaurant } from './entities/restaurant.entity'
import { Model } from 'mongoose'

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const createdRestaurant =
      await this.restaurantModel.create(createRestaurantDto)
    return createdRestaurant
  }

  async findAll(cuisines?: string[]) {
    if (cuisines) {
      return await this.restaurantModel
        .find({
          cuisines: {
            $in: cuisines.map((cuisine) => cuisine),
          },
        })
        .sort({ createdAt: -1 })
    }
    return await this.restaurantModel.find().sort({ createdAt: -1 })
  }

  async findOne(id: string) {
    // First, try to find the restaurant by its slug
    const restaurant = await this.restaurantModel.findOne({ slug: id })
    if (restaurant) return restaurant

    // If the restaurant is not found, try to find it by its id
    return await this.restaurantModel.findById(id)
  }

  async findNearby(id: string, maxDistance: number = 1000) {
    const restaurant = await this.restaurantModel.findById(id)
    if (!restaurant) {
      throw new Error('Restaurant not found')
    }

    return await this.restaurantModel.find({
      _id: { $ne: id }, // Exclude the restaurant itself
      location: {
        $near: {
          $geometry: restaurant.location,
          $maxDistance: maxDistance,
        },
      },
    })
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    // Ensure the location is in the correct format: { type: 'Point', coordinates: [lng, lat] }
    if (updateRestaurantDto.location) {
      // Ensure the location has a type
      updateRestaurantDto.location.type = 'Point'
    }
    return await this.restaurantModel.findByIdAndUpdate(
      id,
      updateRestaurantDto,
      { new: true },
    )
  }

  async remove(id: string) {
    return await this.restaurantModel.findByIdAndDelete(id)
  }
}
