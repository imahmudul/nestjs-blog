import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty, IsArray, IsBoolean, IsNumber } from 'class-validator';

export class LikeDto {
    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    userId: string;
}