import { MdExitToApp } from "react-icons/md";
import { CircleButton } from "./CircleButton.js";

interface Props {
  signOut: () => void;
}

export const SignOut = ({ signOut }: Props): JSX.Element => (
  <CircleButton onClick={signOut} secondary>
    <MdExitToApp />
  </CircleButton>
);
