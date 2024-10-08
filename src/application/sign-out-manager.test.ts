import { expect, it } from "vitest";
import { SignOutManager } from "./sign-out-manager.js";
import { authenticationController, authenticationPresenter } from "./test.js";

it("signs out", async () => {
  const signOutManager = new SignOutManager(
    authenticationController,
    authenticationPresenter,
  );

  await signOutManager.signOut();

  expect(authenticationController.signOut).toHaveBeenCalledOnce();
  expect(authenticationPresenter.presentSignedIn).toHaveBeenCalledOnce();
  expect(authenticationPresenter.presentSignedIn).toHaveBeenCalledWith(false);
});
