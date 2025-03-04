import { DefaultArgs } from "@prisma/client/runtime/library";
import { Prisma, PrismaClient } from "@prisma/client";
import { IS_BROWSER } from "config/envs";
import { Logger } from "logger";

if (IS_BROWSER)
  throw Error("Prisma should not be imported to browser functions");

/**
 * Singleton pattern implementation for Prisma Client to prevent multiple instances.
 * Ensures only one instance of Prisma Client is used throughout the application.
 * As example you might have two prisma clients on for auth on for db....don't even ask why,
 */

/**
 * For some reason there is an issue with PRISMA + NEXTJS
 *
 */
export const prismaClientSingleton = (() => {
  let prisma!: PrismaClient<
    {
      log: (
        | { emit: "event"; level: "query" }
        | { emit: "event"; level: "error" }
        | { emit: "event"; level: "info" }
        | { emit: "event"; level: "warn" }
      )[];
    },
    "error" | "warn" | "info" | "query",
    DefaultArgs
  >;

  /**
   * Initializes or retrieves the existing instance of Prisma Client.
   * @returns The singleton Prisma Client instance.
   */
  const getInstance = (logger: Logger): PrismaClient => {
    if (!prisma) {
      prisma = new PrismaClient({
        log: [
          {
            emit: "event",
            level: "query",
          },
          {
            emit: "event",
            level: "error",
          },
          {
            emit: "event",
            level: "info",
          },
          {
            emit: "event",
            level: "warn",
          },
        ],
      });

      prisma.$on("error", (e: Prisma.LogEvent) => {
        if (e.message.includes("Record to delete does not exist.")) return;
        logger.error(e.target);
        console.error(e.message);
      });

      prisma.$on("info", (e: Prisma.LogEvent) => {
        logger.info(
          JSON.stringify(
            {
              message: e.message,
            },
            null,
            2
          )
        );
      });

      prisma.$on("warn", (e: Prisma.LogEvent) => {
        logger.warn(
          JSON.stringify(
            {
              target: e.target,
              message: e.message,
            },
            null,
            2
          )
        );
      });

      logger.debug(
        "Prisma Platform Client instance created. Ensure that this is intentional."
      );
    }
    return prisma;
  };

  return { getInstance };
})();
