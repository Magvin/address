import { prismaEmber as prisma } from "@prisma-ember/prisma";
export type { Address } from "@prisma/client";

export default {
  ...prisma.address,
};
