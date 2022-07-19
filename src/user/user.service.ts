import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { v4 as uuidV4 } from "uuid";
import { CustomError } from "src/dto/custom-error.dto";
import { User } from "src/dto/object-type/user.dto";
import * as bcrypt from "bcrypt";
import { UserPass } from "src/dto/object-type/user-with-pass.dto";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(): Promise<User[] | CustomError> {
    try {
      const users = await this.prismaService.user.findMany({
        include: {
          orders: {
            include: {
              orderProducts: true,
            },
          },
          wishlists: true,
        },
      });
      return users;
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
  }

  async getUser(id: string): Promise<User | CustomError> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      return user;
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
  }

  async createUser({
    email,
    password,
    salt,
  }: any): Promise<User | CustomError> {
    try {
      const id = uuidV4();

      const data = {
        id,
        email,
        salt,
        password,
      };

      const newUser = this.prismaService.user.create({
        data,
      });

      return newUser;
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
  }

  async findOne(email: string): Promise<UserPass | CustomError> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
  }

  async updateRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<any | CustomError> {
    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: { refreshToken },
      });

      return user;
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
  }
}
