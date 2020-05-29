import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, IsOptional, IsString, IsDefined} from 'class-validator';
import { IsEqualTo } from '../_lib/validators/IsEqualToValidator';

export class UserRegister {

    @ApiProperty()
    @IsOptional()
    @IsString()
    public firstName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    public lastName: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    public displayName: string;

    @ApiProperty()
    @IsEmail()
    public email: string;

    @ApiProperty()
    @Length(8, 255)
    @IsString()
    public password: string;

    @ApiProperty()
    @Length(8, 255)
    @IsString()
    @IsEqualTo('password')
    public confirmPassword: string;

}

