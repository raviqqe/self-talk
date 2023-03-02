import { type Mocked, vi } from "vitest";
import { type IAuthenticationController } from "../authentication-controller";

export const authenticationController: Mocked<IAuthenticationController> = {
  isSignedIn: vi.fn(async () => false),
  signIn: vi.fn(async () => {}),
  signOut: vi.fn(async () => {}),
};
