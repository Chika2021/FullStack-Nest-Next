import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "./users.service";
import { User } from "./user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'ANYACHIKAAMAECHI',
        });
    }

    async validate(payload: any): Promise<User> {
        const user = await this.usersService.findById(payload.id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}