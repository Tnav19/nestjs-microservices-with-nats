import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The display name of the user (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  displayName?: string;
}
