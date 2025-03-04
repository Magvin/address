import { prismaClientSingleton } from "@prisma-ember/prismaEmber";
import { Node } from "@logtail/js";
import { Logger } from "logger";

const logtail = new Node("YOUR_LOGTAIL_SOURCE_TOKEN");

const logger = {
  error: (msg: string) => logtail.error(msg),
  warn: (msg: string) => logtail.warn(msg),
  info: (msg: string) => logtail.info(msg),
  debug: (msg: string) => logtail.debug(msg),
};

declare const globalThis: {
  prismaEmberGlobal: ReturnType<typeof prismaClientSingleton.getInstance>;
} & typeof global;

const prismaEmber =
  globalThis.prismaEmberGlobal ??
  prismaClientSingleton.getInstance(logger as unknown as Logger);

if (process.env.NODE_ENV !== "production")
  globalThis.prismaEmberGlobal = prismaEmber;

export { prismaEmber };
