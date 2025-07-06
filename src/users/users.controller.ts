import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto)
    } catch (error: any) {
      // Check for Mongoose error
      if (error.name && error.name === 'ValidationError') {
        throw new BadRequestException(`Validation error: ${error.message}`)
      }
      // Generic error
      throw new InternalServerErrorException(
        `An error occurred while creating the user: ${error.message}`,
      )
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll()
    } catch (error: any) {
      // Check for Mongoose error
      if (error.name && error.name === 'ValidationError') {
        throw new BadRequestException(`Validation error: ${error.message}`)
      }
      // Generic error
      throw new InternalServerErrorException(
        `An error occurred while fetching users: ${error.message}`,
      )
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(id)
    } catch (error: any) {
      // Check for Mongoose error
      if (error.name && error.name === 'ValidationError') {
        throw new BadRequestException(`Validation error: ${error.message}`)
      }
      // Generic error
      throw new InternalServerErrorException(
        `An error occurred while fetching the user: ${error.message}`,
      )
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(id, updateUserDto)
    } catch (error: any) {
      // Check for Mongoose error
      if (error.name && error.name === 'ValidationError') {
        throw new BadRequestException(`Validation error: ${error.message}`)
      }
      // Generic error
      throw new InternalServerErrorException(
        `An error occurred while updating the user: ${error.message}`,
      )
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(id)
    } catch (error: any) {
      // Check for Mongoose error
      if (error.name && error.name === 'ValidationError') {
        throw new BadRequestException(`Validation error: ${error.message}`)
      }
      // Generic error
      throw new InternalServerErrorException(
        `An error occurred while deleting the user: ${error.message}`,
      )
    }
  }
}
