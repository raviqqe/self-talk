import { type Mocked, vi } from "vitest";
import type { AuthenticationPresenter } from "../authentication-presenter.js";

export const authenticationPresenter: Mocked<AuthenticationPresenter> = {
  presentSignedIn: vi.fn((_: boolean) => {}),
};
