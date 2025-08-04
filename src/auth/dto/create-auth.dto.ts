import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsEmpty,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
export class CreateAuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;
}
