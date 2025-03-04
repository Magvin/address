import { prismaClientSingleton } from "@prisma-ember/prismaEmber";
import { createLogger } from "@helpers/logger";
import { Logger } from "logger";

declare const globalThis: {
  prismaEmberGlobal: ReturnType<typeof prismaClientSingleton.getInstance>;
} & typeof global;

const prismaEmber =
  globalThis.prismaEmberGlobal ??
  prismaClientSingleton.getInstance(
    createLogger("PrismaEmber").logger as unknown as Logger
  );

if (process.env.NODE_ENV !== "production")
  globalThis.prismaEmberGlobal = prismaEmber;

export { prismaEmber };
