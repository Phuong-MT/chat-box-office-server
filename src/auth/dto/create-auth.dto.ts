import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsEmpty,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'MinhPhuong',
  })
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @ApiProperty({
    example: 'MinhPhuong123@',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;
}
