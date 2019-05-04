import React from "react";
import { render } from "react-dom";
import { ApplicationInitializer } from "../../application/application-initializer";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { App } from "./App";

export class ReactRenderer {
  constructor(
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager
  ) {}

  public render(element: HTMLElement): void {
    render(
      <App
        initialize={() => this.applicationInitializer.initialize()}
        signIn={() => this.signInManager.signIn()}
        signOut={() => this.signOutManager.signOut()}
      />,
      element
    );
  }
}
