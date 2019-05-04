import React from "react";
import { render } from "react-dom";
import {
  ApplicationInitializer,
  IInitialState
} from "../../../application/application-initializer";
import { SignInManager } from "../../../application/sign-in-manager";
import { SignOutManager } from "../../../application/sign-out-manager";
import { App } from "../App";

it("renders", () => {
  render(
    <App
      applicationInitializer={
        {
          initialize: async () => ({} as IInitialState)
        } as ApplicationInitializer
      }
      signInManager={{} as SignInManager}
      signOutManager={{} as SignOutManager}
    />,
    document.createElement("div")
  );
});
