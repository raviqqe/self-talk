import type { ComponentProps, JSX } from "react";
import { Button } from "./Button.js";
import styles from "./CircleButton.module.css";

type Props = ComponentProps<typeof Button>;

export const CircleButton = ({ className, ...props }: Props): JSX.Element => (
  <Button
    className={[styles.circleButton, className].filter(Boolean).join(" ")}
    {...props}
  />
);
