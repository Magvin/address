import { css } from "@emotion/react";
import resetStyles from "@styles/reset";
import {
  fontFamilyVar,
  pageBackgroundVar,
  textColorVar,
} from "./constants/cssVariables";

export const globalStyles = css`
  ${resetStyles}
  :root {
    //disable zoom
    touch-action: pan-x pan-y;
    height: 100%;
  }

  * {
    box-sizing: border-box;
    font-family: var(${fontFamilyVar}) !important;
  }

  body {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: var(${pageBackgroundVar}) !important;
    color: var(${textColorVar});
    margin: 0;
  }
`;
