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

  create(createRestaurantDto: CreateRestaurantDto) {
    const createdRestaurant = this.restaurantModel.create(createRestaurantDto)
    return createdRestaurant
  }

  findAll(cuisine?: string) {
    if (cuisine) {
      return this.restaurantModel
        .find({ cuisines: cuisine })
        .sort({ createdAt: -1 })
        .exec()
    }
    return this.restaurantModel.find().sort({ createdAt: -1 }).exec()
  }

  findOne(id: string) {
    return this.restaurantModel.findById(id)
  }

  update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantModel
      .findByIdAndUpdate(id, updateRestaurantDto, { new: true })
      .exec()
  }

  remove(id: string) {
    return this.restaurantModel.findByIdAndDelete(id).exec()
  }
}
