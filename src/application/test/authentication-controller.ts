import { type Mocked, vi } from "vitest";
import { type IAuthenticationController } from "../authentication-controller.js";

export const authenticationController: Mocked<IAuthenticationController> = {
  isSignedIn: vi.fn(async () => false),
  signIn: vi.fn(async () => {}),
  signOut: vi.fn(async () => {}),
};
