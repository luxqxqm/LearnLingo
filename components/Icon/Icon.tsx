import type { SVGProps } from "react";

import styles from "./Icon.module.css";

export type IconName =
  | "logo"
  | "log-in"
  | "like"
  | "star"
  | "book-open"
  | "close-icon"
  | "eye-off";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export default function Icon({ name, className = "", ...props }: IconProps) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      aria-hidden="true"
      {...props}
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
