import { MdExitToApp } from "react-icons/md";
import { CircleButton } from "./CircleButton";

interface IProps {
  signOut: () => void;
}

export const SignOut = ({ signOut }: IProps): JSX.Element => (
  <CircleButton onClick={signOut} secondary={true}>
    <MdExitToApp />
  </CircleButton>
);
