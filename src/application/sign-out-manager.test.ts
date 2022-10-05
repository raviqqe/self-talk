import { it, vi, expect } from "vitest";
import { IAuthenticationController } from "./authentication-controller";
import { SignOutManager } from "./sign-out-manager";

it("signs out", async () => {
  const authenticationController = {
    signOut: vi.fn(async () => false),
  };
  const authenticationPresenter = { presentSignedIn: vi.fn() };
  const signOutManager = new SignOutManager(
    authenticationController as unknown as IAuthenticationController,
    authenticationPresenter
  );

  await signOutManager.signOut();

  expect(authenticationController.signOut).toHaveBeenCalledTimes(1);
  expect(authenticationPresenter.presentSignedIn.mock.calls).toEqual([[false]]);
});
