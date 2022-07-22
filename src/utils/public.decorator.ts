import { SetMetadata } from "@nestjs/common";

export const Public = () => SetMetadata("isPublic", true);
export const Private = (role: string) =>
  SetMetadata("isAdmin", role === "ADMIN" || role === "admin");
