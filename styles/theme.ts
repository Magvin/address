import "@emotion/react";
import { Inter } from "next/font/google";

/**
 * Red
 */

const red500 = `#B01010`;
const red400 = "#CF595F";

/**
 * White
 */
const white = `#FFFFFF`;

/**
 * Black
 */
const black = `#151617`;
const black50 = `#262628`;
const black850 = "#1E1E1C";
const vulkan = "#363738";

/**
 * Gray
 */
const gray50 = "#F6F7FA";
const gray100 = "#EAEDF5";
const gray150 = `#F4F6F9`;

const gray300 = "#5E6064";
const gray500 = "#999999";

const gray600 = "#666666";
const gray650 = "#5E6064";

const gray700 = "#4D4D4D";
const gray750 = "#343433";
const gray800 = "#333333";
const gray900 = "#000000";

/**
 * Green
 */

const green = "#1CCA7D";
const green800 = "#217854";

/**
 * Purple
 */

const purple = "#BD4DFC";
const purple100 = "#8F84DE";

/**
 * Orange
 */

const orange = "#FC9A7B";
const orange700 = "#EE8C4A";

/**
 * Blue
 */

const blue400 = "#6CAAF8";
const blue500 = "#644DFC";

/**
 * Project level styles
 */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  adjustFontFallback: true,
});
const projectTheme = {
  fontFamily: inter.style.fontFamily,
  checkBox: {
    labelGap: 10,
  },
  switch: {
    labelGap: 10,
  },
};

export const lighTheme = {
  ...projectTheme,
  key: "dark",
  colors: {
    white,
    text: white,
    black,
    black850,
    black50,
    vulkan,
    red: red500,
    red400,
    gray: gray650,
    gray50,
    gray100,
    gray150,
    gray300,
    gray500,
    gray600,
    gray650,
    gray700,
    gray750,
    gray800,
    gray900,
    blue400,
    green,
    green800,
    primary: green,
    blue500,
    orange,
    orange700,
    purple,
    purple100,
    pageBackground: white,
  },
};

/**
 * Extend style-components with theme type
 */

export type ITheme = typeof lighTheme;

export type PropsWithTheme<T = unknown> = T & {
  theme: ITheme;
};

export const themes = {
  main: lighTheme,
};
