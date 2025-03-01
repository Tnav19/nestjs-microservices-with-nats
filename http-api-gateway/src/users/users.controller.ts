import {
 Controller,
 Inject,
 Post,
 Body,
 Get,
 Param,
 HttpException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { lastValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/typeorm/entities/User';

@ApiTags('users')
@ApiBearerAuth() // If you're using bearer token for auth
@Controller('users')
export class UsersController {
 constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

 @Post()
 @ApiOperation({ summary: 'Create a new user' })
 @ApiResponse({
   status: 201,
   description: 'The user has been successfully created.',
   type: User,
 })
 @ApiResponse({ status: 403, description: 'Forbidden.' })
 createUser(@Body() createUserDto: CreateUserDto) {
   console.log(createUserDto);
   return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
 }

 @Get(':id')
 @ApiOperation({ summary: 'Get user by ID' })
 @ApiResponse({
   status: 200,
   description: 'The found user',
   type: User,
 })
 @ApiResponse({ status: 404, description: 'User Not Found' })
 async getUserById(@Param('id') id: string) {
   const user = await lastValueFrom(
     this.natsClient.send({ cmd: 'getUserById' }, { userId: id }),
   );
   if (user) return user;
   else throw new HttpException('User Not Found', 404);
 }
}
