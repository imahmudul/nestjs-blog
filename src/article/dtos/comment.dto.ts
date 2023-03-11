import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty, IsArray, IsBoolean, IsNumber } from 'class-validator';

export class CommentDto {
    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({default: "demo comment", required: true})
    @IsString()
    @IsNotEmpty()
    content: string;
}