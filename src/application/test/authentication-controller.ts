import { type Mocked, vi } from "vitest";
import { type AuthenticationController } from "../authentication-controller.js";

export const authenticationController: Mocked<AuthenticationController> = {
  isSignedIn: vi.fn(async (): Promise<boolean> => false),
  signIn: vi.fn(async () => {}),
  signOut: vi.fn(async () => {}),
};
