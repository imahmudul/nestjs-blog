import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty, IsArray, IsBoolean, IsNumber } from 'class-validator';

export class CreateArticleDto {
    @ApiProperty({default: "Demo Article", required: true})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({default: "This is demo content.", required: true})
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({default: "Test", required: false})
    @IsString()
    category: string;

    @ApiProperty({default: ['Demo', 'Test'], required: true})
    @IsArray()
    @IsNotEmpty()
    tags;

    @IsArray()
    likes;

    @IsArray()
    dislikes;

    @IsArray()
    comments;

    @IsDateString()
    createdAt: Date;

    @IsDateString()
    updatedAt: Date;
}