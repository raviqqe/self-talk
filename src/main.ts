import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { ReactRenderer } from "./infrastructure/react.js";
import { authenticationPresenter } from "./main/authentication-presenter.js";
import { documentPresenter } from "./main/document-presenter.js";
import { errorReporter } from "./main/error-reporter.js";

try {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  new ReactRenderer(element, [
    authenticationPresenter,
    documentPresenter,
  ]).render();
} catch (error) {
  errorReporter.report(error);
}
