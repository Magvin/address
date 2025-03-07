import React, { SVGProps } from "react";

declare module "react" {
  interface SVGProps<T> {
    transformOrigin?: string;
  }
}
