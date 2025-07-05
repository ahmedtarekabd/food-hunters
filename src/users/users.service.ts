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

  create(createUserDto: CreateUserDto) {
    const createdUser = this.userModel.create(createUserDto)
    return createdUser
  }

  findAll() {
    return this.userModel.find().sort({ createdAt: -1 }).exec()
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec()
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec()
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec()
  }
}
