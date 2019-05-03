import React from "react";
import { connect } from "react-redux";
import { IActionCreators, actionCreators } from "../store/authentication";
import { IGlobalState } from "../store";

export const SignIn = connect(
  ({ authentication }: IGlobalState) => authentication,
  actionCreators
)(({ signIn }: IActionCreators) => (
  <div>
    <button onClick={() => signIn()}>Sign in</button>
  </div>
));
