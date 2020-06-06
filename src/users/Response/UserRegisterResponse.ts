import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './UserResponse';
import { Expose, plainToClass, Type } from "class-transformer";

export class UserRegisterResponse {

    @ApiProperty()
    @Expose()
    expiresIn: Number;

    @ApiProperty()
    @Expose()
    token: String;

    @ApiProperty()
    @Expose()
    @Type(() => UserResponse)
    user: UserResponse;

    public static create(data: any): UserRegisterResponse {
    
        return plainToClass(UserRegisterResponse, data, { excludeExtraneousValues: true });
    
    }

}