import React, { useEffect } from "react";
import clsx from "clsx";

// Custom.
import { useStyles } from "./styles";

export interface Image {
  src: string;
  alt?: string;
  className?: string;
  height?: number;
  width?: number;
}

export const IMG_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const Image: React.FC<Image> = (props) => {
  const { src, alt, className, height, width } = props;
  const classes = useStyles();
  const getSrc = () => {
    if (!src) {
      return IMG_PLACEHOLDER;
    }
    let result = [src];
    if (height && width) {
      result.push(`d=${width}x${height}`);
    }
    return result.join("?");
  };
  return (
    <img
      src={getSrc()}
      alt={alt}
      className={clsx(classes.root, className)}
      height={height}
      width={width}
    />
  );
};

export default Image;
