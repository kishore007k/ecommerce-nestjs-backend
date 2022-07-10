import { Injectable } from "@nestjs/common";
import { CustomError } from "src/dto/custom-error.dto";
import { User } from "src/dto/object-type/user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { v4 as uuidV4 } from "uuid";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(): Promise<User[] | CustomError> {
    try {
      const users = await this.prismaService.user.findMany();
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

  async createUser({ email, password }: any): Promise<User | CustomError> {
    try {
      const id = uuidV4();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);

      const data = {
        id,
        email,
        salt,
        password: hashedPassword,
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
}
