import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsIn } from 'class-validator';

export class UpdateIdeaComment {

    @ApiProperty()
    @IsString()
    @Length(0, 4000)
    text: string;

}