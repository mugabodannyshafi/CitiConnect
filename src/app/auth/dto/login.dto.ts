import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AuthPayloadDto {
  @ApiProperty({
    description: 'User email address',
    example: 'johndoe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}