import { expect, it } from "vitest";
import { SignInManager } from "./sign-in-manager.js";
import { authenticationController, authenticationPresenter } from "./test.js";

it("signs in", async () => {
  const signInManager = new SignInManager(
    authenticationController,
    authenticationPresenter
  );

  await signInManager.signIn();

  expect(authenticationController.signIn).toHaveBeenCalledOnce();
  expect(authenticationPresenter.presentSignedIn).toHaveBeenCalledOnce();
});
