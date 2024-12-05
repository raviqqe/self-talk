import { type AuthenticationPresenter } from "../application/authentication-presenter.js";
import { AuthenticationRenderer } from "../infrastructure/authentication-renderer.js";

export const authenticationPresenter =
  new AuthenticationRenderer() satisfies AuthenticationPresenter;
