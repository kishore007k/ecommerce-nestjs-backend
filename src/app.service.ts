import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hi!, I am a NestJS app! :D";
  }
}
