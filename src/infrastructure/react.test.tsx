import { it } from "vitest";
import { type SignInManager } from "../application/sign-in-manager.js";
import { type SignOutManager } from "../application/sign-out-manager.js";
import { ReactRenderer } from "./react.js";

it("renders", () => {
  new ReactRenderer(
    document.createElement("div"),
    [],
    {} as SignInManager,
    {} as SignOutManager,
    "url",
  ).render();
});
