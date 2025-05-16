import { BadRequestException, Injectable } from "@nestjs/common";
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
}