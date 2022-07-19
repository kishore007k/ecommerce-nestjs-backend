import { Module } from '@nestjs/common';
import { WishlistResolver } from './wishlist.resolver';
import { WishlistService } from './wishlist.service';

@Module({
  providers: [WishlistResolver, WishlistService]
})
export class WishlistModule {}
