import { Global, useTheme } from "@emotion/react";
import { globalStyles } from "@styles/global";
import { ITheme, themes } from "@styles/theme";
import { ThemeProvider as EmotionProvider } from "@emotion/react";
import { FC, PropsWithChildren } from "react";
import {
  primaryVar,
  primaryVar010,
  fontFamilyVar,
  pageBackgroundVar,
  textColorVar,
} from "@styles/constants/cssVariables";
import { rgba } from "polished";

export const GlobalCSSVariables = () => {
  const theme = useTheme() as ITheme;
  return (
    <style>{`
			:root {
				${primaryVar}: ${theme.colors.primary};
				${primaryVar010}: ${rgba(theme.colors.primary, 0.1)};
				${fontFamilyVar}: ${theme.fontFamily};
				${pageBackgroundVar}: ${theme.colors.pageBackground};
				${textColorVar}: ${theme.colors.black};
			}
		`}</style>
  );
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <EmotionProvider theme={themes.main}>
      <GlobalCSSVariables />
      <Global styles={globalStyles} />
      {children}
    </EmotionProvider>
  );
};
