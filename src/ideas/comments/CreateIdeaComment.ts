import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsIn } from 'class-validator';

export class CreateIdeaComment {

    @ApiProperty()
    @IsString()
    @Length(0, 4000)
    comment: string;

}