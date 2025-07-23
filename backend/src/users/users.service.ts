import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {
        console.log(User.name, 'model injected');
    }

    async users(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async createUser(userDto: UserDto): Promise<User> {
        const { username, email, password } = userDto;
        if(!username || !email || !password) {
            return { message: 'Invalid user data is required' } as any;
        }

        const confirmPassword = await bcrypt.hash(password, 10);
        if (!confirmPassword) {
            return { message: 'Password hashing failed' } as any;
        }
        
        const user = await this.userModel.create({
            username,   
            email,
            password: confirmPassword
        });
        const token = this.jwtService.sign({id: user._id, email: user.email})
        return { user, token } as any;
    }

    async login(userDto: UserDto):Promise<any> {
        const { email, password } = userDto
        if (!email || !password) {
            return { message: 'Email and password are required' };
        }
        const user = await this.userModel.findOne({ email }).exec();
        if(!user) {
            return { message: 'User not found' } as any;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return { message: 'Invalid password try again' } as any;
        }
        const token = this.jwtService.sign({id: user._id, email: user.email})

        return { token, user: { username: user.username, email: user.email } } as any
          
    }

    async searchUser(userDto: UserDto):Promise<User | any> {
        const { username } = userDto;
        if (!username) {        
            return { message: 'Username is required' } as any;
        }
        const search = await this.userModel.findOne({ username });
        if (!search) {
            return { message: 'User not found' } as any;
        }
        return search;
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id);
    }
    async logout(): Promise<{ message: string }> {
        // For JWT, logout is handled on the client by removing the token.
        // Optionally, you can implement token blacklisting here.
        return { message: 'Logout successful. Please remove your token on the client.' };
    }
}
