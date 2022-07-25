import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CustomError } from "src/dto/custom-error.dto";
import { CustomResponse } from "src/dto/custom-response.dto";
import { WishlistInput } from "src/dto/input-type/wishlist.dto";
import { Wishlist } from "src/dto/object-type/wishlist.dto";
import { WishlistService } from "./wishlist.service";

@Resolver()
export class WishlistResolver {
  constructor(private readonly wishlistService: WishlistService) {}

  // Get all wishlists
  @Query(() => [Wishlist], { name: "getAllWishlist" })
  async getWishlist(): Promise<Wishlist[] | CustomError> {
    return this.wishlistService.getWishlist();
  }

  // 📝 Get wishlist by id
  @Query(() => Wishlist, { name: "getWishlistById" })
  async getWishlistById(
    @Args("wishlistId") wishlistId: string,
  ): Promise<Wishlist | CustomError> {
    return this.wishlistService.getWishlistById(wishlistId);
  }

  // 📝 Get wishlist by user id
  @Query(() => [Wishlist], { name: "getWishlistByUserId" })
  async getWishlistByUserId(
    @Args("userId") userId: string,
  ): Promise<Wishlist[] | CustomError> {
    return this.wishlistService.getWishlistByUserId(userId);
  }

  // 📝 Create wishlist
  @Mutation(() => CustomResponse, { name: "createWishlist" })
  async addToWishlist(
    @Args("wishlistData") wishlistData: WishlistInput,
  ): Promise<CustomResponse | CustomError> {
    return this.wishlistService.addToWishlist(wishlistData);
  }

  // 📝 Delete wishlist
  @Mutation(() => CustomResponse, { name: "deleteWishlist" })
  async deleteWishlist(
    @Args("wishlistId") wishlistId: string,
  ): Promise<CustomResponse | CustomError> {
    return this.wishlistService.deleteWishlist(wishlistId);
  }

  // 📝 Update wishlist
  @Mutation(() => CustomResponse, { name: "updateWishlist" })
  async updateWishlist(
    @Args("wishlistId") wishlistId: string,
    @Args("wishlistData") wishlistData: WishlistInput,
  ): Promise<CustomResponse | CustomError> {
    return this.wishlistService.updateWishlist(wishlistId, wishlistData);
  }

  // addProductToWishlist
  @Mutation(() => Wishlist, { name: "addProductToWishlist" })
  async addProductToWishlist(
    @Args("wishlistId") wishlistId: string,
    @Args("productId") productId: string,
  ): Promise<Wishlist | CustomError> {
    return this.wishlistService.addProductToWishlist(wishlistId, productId);
  }

  // removeProductFromWishlist
  @Mutation(() => Wishlist, { name: "removeProductFromWishlist" })
  async removeProductFromWishlist(
    @Args("wishlistId") wishlistId: string,
    @Args("productId") productId: string,
  ): Promise<Wishlist | CustomError> {
    return this.wishlistService.removeProductFromWishlist(
      wishlistId,
      productId,
    );
  }
}
