import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './entities/user.entity'
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userModel.create(createUserDto)
    return createdUser
  }

  async findAll() {
    return await this.userModel.find().sort({ createdAt: -1 }).exec()
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec()
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec()
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec()
  }

  async getUsersWithSimilarFavoriteCuisines(userId: string) {
    const user = await this.userModel.findById(userId).exec()
    if (!user) {
      throw new Error('User not found')
    }

    console.log('user', user)
    const usersWithSameCuisine = await this.userModel.aggregate([
      { $match: { _id: user._id } },
      { $project: { favoriteCuisines: 1 } },
      {
        $lookup: {
          from: 'users',
          let: { favCuisine: '$favoriteCuisines', userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $ne: ['$_id', '$$userId'] },
                    {
                      $gt: [
                        {
                          $size: {
                            $setIntersection: [
                              '$favoriteCuisines',
                              '$$favCuisine',
                            ],
                          },
                        },
                        0,
                      ],
                    },
                  ],
                },
              },
            },
            { $project: { _id: 1, name: 1, favoriteCuisines: 1 } },
          ],
          as: 'similarUsers',
        },
      },
      { $unwind: '$similarUsers' },
      { $replaceRoot: { newRoot: '$similarUsers' } },
    ])
    console.log('usersWithSameCuisine', usersWithSameCuisine)

    // const similarUserIds = usersWithSameCuisine.map((u) => u._id)
    return usersWithSameCuisine
  }
}
