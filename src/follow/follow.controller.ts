import {
  Controller,
  Get,
  Post,
  Param,
  InternalServerErrorException,
  Delete,
} from '@nestjs/common'
import { FollowService } from './follow.service'
import { CreateFollowDto } from './dto/create-follow.dto'
import { DeleteFollowDto } from './dto/delete-follow.dto'

@Controller()
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post('users/:userId/restaurants/:restaurantId/follow')
  follow(@Param() createFollowDto: CreateFollowDto) {
    try {
      return this.followService.followRestaurant(createFollowDto)
    } catch (error: any) {
      if (error.name && error.name === 'ValidationError') {
        throw new Error('Validation error: ' + error.message)
      }
      throw new InternalServerErrorException(
        'An error occurred while following the restaurant',
        error.message,
      )
    }
  }

  @Delete('users/:userId/restaurants/:restaurantId/unfollow')
  unfollow(@Param() deleteFollowDto: DeleteFollowDto) {
    try {
      return this.followService.unfollowRestaurant(deleteFollowDto)
    } catch (error: any) {
      if (error.name && error.name === 'ValidationError') {
        throw new Error('Validation error: ' + error.message)
      }
      throw new InternalServerErrorException(
        'An error occurred while unfollowing the restaurant',
        error.message,
      )
    }
  }

  @Get('users/:userId/followings')
  getUserFollowings(@Param('userId') userId: string) {
    try {
      return this.followService.getUserFollowings(userId)
    } catch (error: any) {
      if (error.name && error.name === 'ValidationError') {
        throw new Error('Validation error: ' + error.message)
      }
      throw new InternalServerErrorException(
        'An error occurred while retrieving user followings',
        error.message,
      )
    }
  }

  @Get('restaurants/:restaurantId/followers')
  getRestaurantFollowers(@Param('restaurantId') restaurantId: string) {
    try {
      return this.followService.getRestaurantFollowers(restaurantId)
    } catch (error: any) {
      if (error.name && error.name === 'ValidationError') {
        throw new Error('Validation error: ' + error.message)
      }
      throw new InternalServerErrorException(
        'An error occurred while retrieving restaurant followers',
        error.message,
      )
    }
  }

  @Get('follow')
  findAll() {
    try {
      return this.followService.findAll()
    } catch (error: any) {
      if (error.name && error.name === 'ValidationError') {
        throw new Error('Validation error: ' + error.message)
      }
      throw new InternalServerErrorException(
        'An error occurred while retrieving follows',
        error.message,
      )
    }
  }
}
