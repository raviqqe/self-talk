import React from "react";
import ReactDOM from "react-dom";
import { ApplicationInitializer } from "./application/application-initializer";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import { FirebaseAuthenticationController } from "./infrastructure/firebase-authentication-controller";
import { FirebaseInitializer } from "./infrastructure/firebase-initializer";
import { App } from "./infrastructure/react/App";

new FirebaseInitializer().initialize();

const authenticationController = new FirebaseAuthenticationController();
const applicationInitializer = new ApplicationInitializer(
  authenticationController
);
const signInManager = new SignInManager(authenticationController);
const signOutManager = new SignOutManager(authenticationController);

ReactDOM.render(
  <App
    applicationInitializer={applicationInitializer}
    signInManager={signInManager}
  />,
  document.getElementById("root")
);
