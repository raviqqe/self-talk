import classNames from "classnames";
import type { JSX } from "react";
import { Button, type Props } from "./Button.js";
import styles from "./CircleButton.module.css";

export const CircleButton = ({ className, ...props }: Props): JSX.Element => (
  <Button className={classNames(styles.root, className)} {...props} />
);
