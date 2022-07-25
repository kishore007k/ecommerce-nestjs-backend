import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CustomError } from "src/dto/custom-error.dto";
import { OrderInput } from "src/dto/input-type/order.dto";
import { Order } from "src/dto/object-type/order.dto";
import { OrderService } from "./order.service";

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  // Get orders
  @Query(() => [Order], { name: "getOrders" })
  async getOrders(): Promise<Order[] | CustomError> {
    return this.orderService.getOrders();
  }

  // Create Order
  @Mutation(() => Order, { name: "createOrder" })
  async createOrder(
    @Args("order") order: OrderInput,
    @Args("userId") userId: string,
    @Args("productId") productId: string,
  ): Promise<Order | CustomError> {
    return this.orderService.createOrder(order, userId, productId);
  }
}
