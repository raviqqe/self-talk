import { type JSX } from "react";
import { MdExitToApp } from "react-icons/md";
import { signOutManager } from "../../main/sign-out-manager.js";
import { CircleButton } from "./CircleButton.js";

export const SignOut = (): JSX.Element => (
  <CircleButton onClick={() => signOutManager.signOut()} secondary>
    <MdExitToApp />
  </CircleButton>
);
