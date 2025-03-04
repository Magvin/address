/* eslint-disable @typescript-eslint/no-empty-interface */
import { ITheme } from "@styles/theme";

/**
 * Extending Theme with our one
 * God Bless Typescript
 */
declare module "@emotion/react" {
  export interface Theme extends ITheme {}
}
