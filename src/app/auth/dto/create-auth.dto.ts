import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/enums/user-role.enum';
import { IsPhone } from 'src/validators/is-phone.validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'hashed_password123', description: 'Password hash' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: '+250781234567', required: false, description: 'Phone number (optional)' })
  @IsPhone()
  @IsString()
  phone_number?: string;


  @ApiPropertyOptional({ example: 'Kigali, Rwanda', required: false, description: 'User address (optional)' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    enum: UserRole,
    default: UserRole.CITIZEN,
    description: 'Role of the user',
  })
  @IsString()
  role?: UserRole;
}
