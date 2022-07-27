import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { OrderModule } from "./order/order.module";
import { WishlistModule } from "./wishlist/wishlist.module";
import { CategoryModule } from "./category/category.module";
import { TagModule } from "./tag/tag.module";
import { ImageModule } from "./image/image.module";
import { ReviewModule } from "./review/review.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      buildSchemaOptions: { dateScalarMode: "timestamp" },
      uploads: {
        maxFileSize: 10000000,
        maxFiles: 20,
      },
      introspection: true,
    }),

    PrismaModule,
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    WishlistModule,
    CategoryModule,
    TagModule,
    ImageModule,
    ReviewModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
