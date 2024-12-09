import { type AuthenticationPresenter } from "../application/authentication-presenter.js";
import { NanostoresAuthenticationPresenter } from "../infrastructure/nanostores-authentication-presenter.js";

export const authenticationPresenter =
  new NanostoresAuthenticationPresenter() satisfies AuthenticationPresenter;
