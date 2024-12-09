import { type JSX } from "react";
import { PulseLoader } from "react-spinners";
import { white } from "./style/colors.js";

export const Loader = (): JSX.Element => (
  <PulseLoader style={{ display: "initial" }} color={white} />
);
