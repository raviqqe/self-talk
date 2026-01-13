import type { AriaAttributes, JSX, ReactNode } from "react";
import styles from "./IconButton.module.css";

interface Props extends AriaAttributes {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

export const IconButton = ({
  children,
  onClick,
  className,
  ...restProps
}: Props): JSX.Element => (
  <button
    className={[styles.button, className].filter(Boolean).join(" ")}
    onClick={onClick}
    type="button"
    {...restProps}
  >
    {children}
  </button>
);
