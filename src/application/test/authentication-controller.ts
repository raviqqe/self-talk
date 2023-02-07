import { Mocked, vi } from "vitest";
import { IAuthenticationController } from "../authentication-controller";

export const authenticationController: Mocked<IAuthenticationController> = {
  signIn: vi.fn(async () => {}),
  signOut: vi.fn(async () => {}),
  isSignedIn: vi.fn(async () => false),
};
