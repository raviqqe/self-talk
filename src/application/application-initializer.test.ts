import { expect, it, vi } from "vitest";
import { ApplicationInitializer } from "./application-initializer.js";
import type { AuthenticationController } from "./authentication-controller.js";

it("initializes an application state", async () => {
  const authenticationController = { isSignedIn: vi.fn(async () => true) };
  const authenticationPresenter = { presentSignedIn: vi.fn() };
  const applicationInitializer = new ApplicationInitializer(
    authenticationController as unknown as AuthenticationController,
    authenticationPresenter,
  );

  await applicationInitializer.initialize();

  expect(authenticationPresenter.presentSignedIn.mock.calls).toEqual([[true]]);
});
