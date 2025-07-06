import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './entities/user.entity'
import { FollowService } from 'src/follow/follow.service'
import { FollowModule } from 'src/follow/follow.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    FollowModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
