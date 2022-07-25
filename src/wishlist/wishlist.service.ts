import { Injectable } from "@nestjs/common";
import { CustomError } from "src/dto/custom-error.dto";
import { CustomResponse } from "src/dto/custom-response.dto";
import { WishlistInput } from "src/dto/input-type/wishlist.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Wishlist } from "../dto/object-type/wishlist.dto";

@Injectable()
export class WishlistService {
  constructor(private readonly prismaService: PrismaService) {}

  // 📝 Create wishlist
  addToWishlist = async (
    wishlistData: WishlistInput,
  ): Promise<CustomResponse | CustomError> => {
    try {
      const wishlist = await this.prismaService.wishlist.create({
        data: {
          ...wishlistData,
        },
      });

      if (!wishlist) {
        return {
          message: "Wishlist not created",
          statusCode: 400,
        };
      }

      return {
        message: "Wishlist created",
        statusCode: 200,
      };
    } catch (error) {
      return {
        message: error.message,
        statusCode: 400,
      };
    }
  };

  // Get all wishlists
  getWishlist = async (): Promise<Wishlist[] | CustomError> => {
    try {
      const wishlist = await this.prismaService.wishlist.findMany({
        include: {
          products: true,
          user: true,
        },
      });

      if (!wishlist) {
        return {
          message: "Wishlist not found",
          statusCode: 400,
        };
      }

      return wishlist;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 400,
      };
    }
  };

  // Get wishlist by id
  getWishlistById = async (id: string): Promise<Wishlist | CustomError> => {
    try {
      const wishlist = await this.prismaService.wishlist.findFirst({
        where: {
          id,
        },
      });

      if (!wishlist) {
        return {
          message: "Wishlist not found",
          statusCode: 400,
        };
      }

      return wishlist;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 400,
      };
    }
  };

  // Get wishlist by user id
  getWishlistByUserId = async (
    userId: string,
  ): Promise<Wishlist[] | CustomError> => {
    try {
      const wishlist = await this.prismaService.wishlist.findMany({
        where: {
          userId,
        },
      });

      if (!wishlist) {
        return {
          message: "Wishlist not found",
          statusCode: 400,
        };
      }

      return wishlist;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 400,
      };
    }
  };

  // Update wishlist
  updateWishlist = async (
    id: string,
    wishlistData: WishlistInput,
  ): Promise<CustomResponse | CustomError> => {
    try {
      const wishlist = await this.prismaService.wishlist.update({
        where: {
          id,
        },
        data: {
          ...wishlistData,
        },
      });

      if (!wishlist) {
        return {
          message: "Wishlist not updated",
          statusCode: 400,
        };
      }

      return {
        message: "Wishlist updated",
        statusCode: 200,
      };
    } catch (error) {
      return {
        message: error.message,
        statusCode: 400,
      };
    }
  };

  // Delete wishlist
  deleteWishlist = async (
    id: string,
  ): Promise<CustomResponse | CustomError> => {
    try {
      const wishlist = await this.prismaService.wishlist.delete({
        where: {
          id,
        },
      });

      if (!wishlist) {
        return {
          message: "Wishlist not deleted",
          statusCode: 400,
        };
      }

      return {
        message: "Wishlist deleted",
        statusCode: 200,
      };
    } catch (error) {
      return {
        message: error.message,
        statusCode: 400,
      };
    }
  };

  // Add Product to wishlist
  addProductToWishlist = async (
    wishlistId: string,
    productId: string,
  ): Promise<Wishlist | CustomError> => {
    try {
      const wishlist = await this.prismaService.wishlist.update({
        where: {
          id: wishlistId,
        },
        data: {
          products: {
            connect: {
              id: productId,
            },
          },
        },
        include: {
          products: true,
        },
      });

      return wishlist;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // Remove Product from wishlist
  removeProductFromWishlist = async (
    wishlistId: string,
    productId: string,
  ): Promise<Wishlist | CustomError> => {
    try {
      const wishlist = await this.prismaService.wishlist.update({
        where: {
          id: wishlistId,
        },
        data: {
          products: {
            disconnect: {
              id: productId,
            },
          },
        },
        include: {
          products: true,
        },
      });

      return wishlist;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };
}
