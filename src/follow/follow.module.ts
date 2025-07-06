import { Module } from '@nestjs/common'
import { FollowService } from './follow.service'
import { FollowController } from './follow.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Follow, FollowSchema } from './entities/follow.entity'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
  ],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
