import { MdExitToApp } from "react-icons/md";
import { CircleButton } from "./CircleButton.js";
import { signOutManager } from "../../main/sign-out-manager.js";

export const SignOut = (): JSX.Element => (
  <CircleButton onClick={() => signOutManager.signOut()} secondary>
    <MdExitToApp />
  </CircleButton>
);
