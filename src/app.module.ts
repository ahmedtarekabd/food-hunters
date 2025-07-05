import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { RestaurantsModule } from './restaurants/restaurants.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    UsersModule,
    RestaurantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
