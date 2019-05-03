import React from "react";
import { SignIn } from "./SignIn";
import { IState } from "../store/authentication";
import { connect } from "react-redux";
import { IGlobalState } from "../store";

export const App = connect(
  ({ authentication }: IGlobalState) => authentication
)(({ signedIn }: IState) => (signedIn ? <div>Hello, world!</div> : <SignIn />));
