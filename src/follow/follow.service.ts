import { Injectable } from '@nestjs/common'
import { CreateFollowDto } from './dto/create-follow.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Follow } from './entities/follow.entity'
import { Model } from 'mongoose'
import { DeleteFollowDto } from './dto/delete-follow.dto'

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow.name) private readonly followModel: Model<Follow>,
  ) {}

  async findAll() {
    return await this.followModel
      .find()
      .populate('userId')
      .populate('restaurantId')
      .sort({ createdAt: -1 })
      .exec()
  }

  async followRestaurant(createFollowDto: CreateFollowDto) {
    return await this.followModel.create(createFollowDto)
  }

  async unfollowRestaurant(deleteFollowDto: DeleteFollowDto) {
    return this.followModel.deleteOne(deleteFollowDto).exec()
  }

  async removeCascadeUser(userId: string) {
    return this.followModel.deleteMany({ userId })
  }

  async removeCascadeRestaurant(restaurantId: string) {
    return this.followModel.deleteMany({ restaurantId })
  }

  async getUserFollowings(userId: string) {
    return this.followModel.find({ userId }).populate('restaurantId').exec()
  }

  async getRestaurantFollowers(restaurantId: string) {
    return this.followModel.find({ restaurantId }).populate('userId').exec()
  }

  async getRestaurantsFollowedByUsers(userIds: string[]): Promise<Follow[]> {
    const followedRestaurants = await this.followModel.aggregate([
      { $match: { userId: { $in: userIds } } },
      {
        $lookup: {
          from: 'restaurants',
          localField: 'restaurantId',
          foreignField: '_id',
          as: 'restaurant',
        },
      },
      { $unwind: '$restaurant' },
      {
        $group: {
          _id: '$restaurant._id',
          name_en: { $first: '$restaurant.name_en' },
          cuisines: { $first: '$restaurant.cuisines' },
        },
      },
    ])
    console.log('followedRestaurants', followedRestaurants)
    return followedRestaurants
  }
}
