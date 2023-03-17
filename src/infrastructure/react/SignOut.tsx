import { MdExitToApp } from "react-icons/md/index.js";
import { CircleButton } from "./CircleButton.js";

interface IProps {
  signOut: () => void;
}

export const SignOut = ({ signOut }: IProps): JSX.Element => (
  <CircleButton onClick={signOut} secondary>
    <MdExitToApp />
  </CircleButton>
);
