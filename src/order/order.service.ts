import { Injectable } from "@nestjs/common";
import { CustomError } from "src/dto/custom-error.dto";
import { OrderInput } from "src/dto/input-type/order.dto";
import { Order } from "src/dto/object-type/order.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create Order
  createOrder = async (
    order: OrderInput,
    userId: string,
    productId: string,
  ): Promise<Order | CustomError> => {
    try {
      const orderCreated = await this.prismaService.order.create({
        data: {
          userId,
          ...order,
        },
        include: {
          user: true,
        },
      });

      await this.prismaService.product.update({
        where: { id: productId },
        data: {
          quantity: {
            decrement: order.quantity,
          },
        },
      });

      const orderProductCreated = await this.prismaService.orderProducts.create(
        {
          data: {
            orderId: orderCreated.id,
            productId,
          },
        },
      );

      if (!orderProductCreated) {
        return {
          message: "Order Product not created",
          statusCode: 400,
        };
      }

      return orderCreated;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // Get orders
  getOrders = async (): Promise<Order[] | CustomError> => {
    try {
      const orders = await this.prismaService.order.findMany({
        include: {
          user: true,
          orderProducts: true,
        },
      });

      return orders;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };
}
