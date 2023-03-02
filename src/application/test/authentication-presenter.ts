import { type Mocked, vi } from "vitest";
import { type IAuthenticationPresenter } from "../authentication-presenter";

export const authenticationPresenter: Mocked<IAuthenticationPresenter> = {
  presentSignedIn: vi.fn((_: boolean) => {}),
};
