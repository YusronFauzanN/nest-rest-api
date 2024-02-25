import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signUp(data: AuthDto) {
    const { email, password } = data;
    try {
      const hashedPass = await argon2.hash(password);
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPass,
        },
      });
      const token = await this.generateToken(user.id, user.email);
      return {
        token,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('User already exist');
      }
    }
  }

  async signIn(data: AuthDto) {
    const { email, password } = data;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const isMatches = await argon2.verify(user.password, password);
    if (!isMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.generateToken(user.id, user.email);
  }

  async generateToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token: token,
    };
  }
}
