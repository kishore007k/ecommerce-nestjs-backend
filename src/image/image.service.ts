import { Injectable } from "@nestjs/common";
import { join } from "path";
import { slugify } from "transliteration";
import { createWriteStream } from "fs";
import * as fs from "fs";
import { CustomError } from "src/dto/custom-error.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Image } from "src/dto/object-type/image.dto";

@Injectable()
export class ImageService {
  constructor(private readonly prismaService: PrismaService) {}

  uploadProductImage = async (
    productId: string,
    productName: string,
    createReadStream: any,
  ): Promise<Image | CustomError> => {
    try {
      const uploadDir = join(process.cwd(), `uploads/${productId}`);
      // File name is the same as the file name in the database
      const fileName = `${Date.now()}-${slugify(productName)}.jpg`;
      // File path is the same as the file path in the database
      const filePath = join(uploadDir, slugify(fileName));

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

      const uri = `${process.env.IMAGE_UPLOADER_URL}/${productId}/${fileName}`;

      const image = await this.prismaService.image.create({
        data: {
          url: uri,
          alt: productName,
        },
      });

      return image;
    } catch (error) {
      console.log("error", error);

      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
  };
}
