import { useMemo } from "react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";

const useClasses = (stylesElement: any) => {
  const theme = useTheme();
  return useMemo(() => {
    const rawClasses =
      typeof stylesElement === "function"
        ? stylesElement(theme)
        : stylesElement;
    const prepared: { [key: string]: any } = {};

    Object.entries(rawClasses).forEach(([key, value = {}]) => {
      prepared[key] = css(value as any);
    });

    return prepared;
  }, [stylesElement, theme]);
};

export default useClasses;
