import { it, expect } from "vitest";
import { SignOutManager } from "./sign-out-manager";
import { authenticationController, authenticationPresenter } from "./test";

it("signs out", async () => {
  const signOutManager = new SignOutManager(
    authenticationController,
    authenticationPresenter
  );

  await signOutManager.signOut();

  expect(authenticationController.signOut).toHaveBeenCalledOnce();
  expect(authenticationPresenter.presentSignedIn).toHaveBeenCalledOnce();
  expect(authenticationPresenter.presentSignedIn).toHaveBeenCalledWith(false);
});
