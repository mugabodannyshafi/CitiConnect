import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-auth.dto";
import { AuthPayloadDto } from "../dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { LocalAuthGuard } from "src/guards/local.guard";
import { JwtAuthGuard } from "src/guards/jwt.guard";
import { User } from "src/entities/user.entity";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: AuthPayloadDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: User }, @Body() _: AuthPayloadDto) {
    return this.authService.login(req.user);
  }
}