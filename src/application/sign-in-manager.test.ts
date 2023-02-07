import { expect, beforeEach, it } from "vitest";
import { SignInManager } from "./sign-in-manager";
import { authenticationController, authenticationPresenter } from "./test";

let signInManager: SignInManager;

beforeEach(() => {
  signInManager = new SignInManager(
    authenticationController,
    authenticationPresenter
  );
});

it("signs in", async () => {
  await signInManager.signIn();

  expect(authenticationController.signIn).toHaveBeenCalledOnce();
  expect(authenticationPresenter.presentSignedIn).toHaveBeenCalledOnce();
});
