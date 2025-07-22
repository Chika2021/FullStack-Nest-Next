import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwtStrategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // Register Passport with JWT strategy
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'ANYACHIKAAMAECHI', // Use environment variable for secret
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController],
  exports: [UsersService, PassportModule, JwtStrategy],
})
export class UsersModule {}
