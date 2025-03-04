export const IS_BROWSER = typeof window !== "undefined";
export const LOG_LEVEL = process.env.NEXT_PUBLIC_LOG_LEVEL ?? "info";
export const STAGE = process.env.NEXT_PUBLIC_STAGE ?? "dev";
export const isProd = STAGE === "prod";
