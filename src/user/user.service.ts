import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { v4 as uuidV4 } from "uuid";
import { CustomError } from "src/dto/custom-error.dto";
import { User } from "src/dto/object-type/user.dto";
import { UserPass } from "src/dto/object-type/user-with-pass.dto";
import { createWriteStream } from "fs";
import { UserInput } from "src/dto/input-type/user.dto";
import { CustomResponse } from "src/dto/custom-response.dto";
import { GenerateRandomAvatarService } from "src/utils/generate-random-avatar.service";
import { GenerateRandomAliasService } from "src/utils/generate-random-alias.service";
import { slugify } from "transliteration";
import { join } from "path";
import * as fs from "fs";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly genAvatarService: GenerateRandomAvatarService,
    private readonly genRandomName: GenerateRandomAliasService,
  ) {}

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
      const name = await this.genRandomName.generate();
      const avatar = await this.genAvatarService.generate(name);

      const data = {
        id,
        email,
        salt,
        password,
        name,
        avatar,
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
  ): Promise<UserPass | CustomError> {
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

  async uploadImage(
    createReadStream: any,
    filename: string,
    email: string,
  ): Promise<String | CustomError> {
    try {
      const uploadDir = join(process.cwd(), `uploads/${email}`);
      // File name is the same as the file name in the database
      const fileName = `${slugify(filename)}`;
      // File path is the same as the file path in the database
      const filePath = join(uploadDir, fileName);

      // Check if the directory exists or not
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      await new Promise(async (resolve, reject) =>
        createReadStream()
          .pipe(createWriteStream(filePath))
          .on("finish", () => resolve(true))
          .on("error", () => reject(false)),
      );

      return `${process.env.IMAGE_UPLOADER_URL}/${fileName}`;
    } catch (error) {
      console.log(error);

      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
  }

  async updateUserImage(
    id: string,
    imageUri: string,
  ): Promise<User | CustomError> {
    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: { avatar: imageUri },
      });

      return user;
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
  }

  async updateUser(id: string, data: UserInput): Promise<User | CustomError> {
    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data,
      });

      return user;
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
  }

  async deleteUser(id: string): Promise<CustomResponse | CustomError> {
    try {
      await this.prismaService.user.delete({
        where: { id },
      });

      // Find and delete user images from uploads folder using user id
      const uploadDir = join(process.cwd(), "uploads");
      const files = fs.readdirSync(uploadDir);
      files.forEach((file) => {
        if (file.includes(id)) {
          fs.unlinkSync(join(uploadDir, file));
        }
      });

      return {
        message: "User deleted",
        statusCode: 200,
      };
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
  }
}
