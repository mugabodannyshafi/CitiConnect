import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "../dto/create-auth.dto";
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}


  async create(createAuthDto: CreateUserDto) {
    const { email } = createAuthDto;
    const duplicateUser = await this.userRepository.findOneBy({ email });
    if (duplicateUser)
      throw new BadRequestException({
        message: 'User already exists',
      });

    const { ...userData } = createAuthDto;
    const finalUserData = { ...userData };
    const hashedPassword = await bcryptjs.hash(finalUserData.password, 10);
    const newUser = this.userRepository.create({
      ...finalUserData,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return {
      message: 'user Created Successful',
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: User) {
    const payload = { userId: user.user_id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  

}