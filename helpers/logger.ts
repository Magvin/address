import { isProd, LOG_LEVEL } from "config/envs";
import { EventEmitter } from "events";
import pino, { DestinationStream, LoggerOptions } from "pino";
import "pino-pretty";

export const divider = ":::";

EventEmitter.defaultMaxListeners = 0;

export const createLogger = (msgPrefix?: string) => {
  const options: LoggerOptions = {
    msgPrefix,
    level: LOG_LEVEL,
  };

  if (!pino.transport) {
    return {
      logger: pino({
        msgPrefix: options.msgPrefix,
        level: LOG_LEVEL,
      }),
    };
  }

  const transport = pino.transport({
    targets: [
      {
        target: "pino-pretty",
        level: LOG_LEVEL,
        options: {
          ...(!isProd && {
            ignore: "pid,hostname",
            colorize: true,
            translateTime: true,
          }),
        },
      },
    ],
  }) as DestinationStream;

  return {
    logger: pino(options, transport),
  };
};

export const childLogger = (logger: Logger, prefix?: string | null) =>
  logger.child(
    {},
    {
      msgPrefix: prefix ? `${prefix} ${divider} ` : undefined,
    }
  );

export type Logger = ReturnType<typeof createLogger>["logger"];
