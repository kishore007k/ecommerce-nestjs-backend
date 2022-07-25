import { Injectable } from "@nestjs/common";
import sharp from "sharp";

@Injectable()
export class ResizeImageService {
  constructor() {}

  resizeImage(image: any, width: number, height: number) {
    // Resize image to width and height and return png or jpeg
    return sharp(image).resize(width, height).jpeg({ quality: 100 });
  }
}
