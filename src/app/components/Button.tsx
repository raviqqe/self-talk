import classNames from "classnames";
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
    className={classNames(styles.button, secondary && styles.secondary, className)}
    {...props}
  />
);
