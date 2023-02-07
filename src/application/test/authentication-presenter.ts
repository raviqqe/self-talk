import { Mocked, vi } from "vitest";
import { IAuthenticationPresenter } from "../authentication-presenter";

export const authenticationPresenter: Mocked<IAuthenticationPresenter> = {
  presentSignedIn: vi.fn((_: boolean) => {}),
};
