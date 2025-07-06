import { Module } from '@nestjs/common'
import { RestaurantsService } from './restaurants.service'
import { RestaurantsController } from './restaurants.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Restaurant, RestaurantSchema } from './entities/restaurant.entity'
import { FollowService } from 'src/follow/follow.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
      },
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, FollowService],
})
export class RestaurantsModule {}
