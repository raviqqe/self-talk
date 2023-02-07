import { expect, beforeEach, it, Mock, vi } from "vitest";
import { IAuthenticationController } from "./authentication-controller";
import { SignInManager } from "./sign-in-manager";

let signInMock: Mock;
let presentMock: Mock;
let signInManager: SignInManager;

beforeEach(() => {
  signInMock = vi.fn();
  presentMock = vi.fn();

  signInManager = new SignInManager(
    { signIn: signInMock } as unknown as IAuthenticationController,
    { presentSignedIn: presentMock }
  );
});

it("signs in", async () => {
  await signInManager.signIn();
  expect(signInMock.mock.calls).toHaveLength(1);
  expect(presentMock.mock.calls).toHaveLength(1);
});
