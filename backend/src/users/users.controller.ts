import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

     
    @Get()
    async getUsers() {
        return await this.usersService.users();
    }
 
    @Post()
    async createUser(@Body() userDto: UserDto): Promise<User> {
        return await this.usersService.createUser(userDto);
    }
   
    @Put('login')
    async login(@Body() userDto: UserDto): Promise<any> {
        return await this.usersService.login(userDto);
    }
    @Post('logout')
    async logout(): Promise<{ message: string }> {
        return await this.usersService.logout();
    }
}
