import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-auth.dto";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

}