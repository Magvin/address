import { ThemeProvider } from "@helpers/ThemeProvider";

import { PropsWithChildren, FC } from "react";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
