import type { ButtonHTMLAttributes, JSX } from "react";
import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
}

export const Button = ({
  secondary,
  className,
  ...props
}: Props): JSX.Element => (
  <button
    className={[
      styles.button,
      secondary ? styles.secondary : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
);
