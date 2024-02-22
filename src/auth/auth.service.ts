import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  signIn() {}

  async signUp(data: any) {
    const { email, password } = data;
    const hashedPass = await argon2.hash(password);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPass,
      },
    });

    return user;
  }
}
