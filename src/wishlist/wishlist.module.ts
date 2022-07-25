import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { WishlistResolver } from "./wishlist.resolver";
import { WishlistService } from "./wishlist.service";

@Module({
  providers: [WishlistResolver, WishlistService, PrismaService],
})
export class WishlistModule {}
