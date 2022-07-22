import { Injectable } from "@nestjs/common";
import { OrderInput } from "src/dto/input-type/order.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create Order
  createOrder = async (order: OrderInput) => {
    try {
      
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };
}
