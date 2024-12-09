import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { type ReactNode } from "react";
import {
  Links,
  type LinksFunction,
  Meta,
  type MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { configuration } from "../configuration.js";

export const meta: MetaFunction = () => [
  {
    charSet: "utf-8",
  },
  {
    content: "width=device-width,initial-scale=1",
    name: "viewport",
  },
  {
    content: "en",
    httpEquiv: "content-language",
  },
  {
    content: configuration.title,
    property: "og:title",
  },
  {
    content: configuration.description,
    property: "og:description",
  },
  {
    content: "website",
    property: "og:type",
  },
  {
    content: "https://notes.code2d.org",
    property: "og:url",
  },
  {
    content: "https://notes.code2d.org/icon.svg",
    property: "og:image",
  },
  {
    content: "summary",
    name: "twitter:card",
  },
  {
    title: configuration.title,
  },
  {
    content: configuration.description,
    name: "description",
  },
];

export const links: LinksFunction = () => [
  {
    href: "/icon.svg",
    rel: "icon",
  },
];

export const Layout = ({ children }: { children: ReactNode }): JSX.Element => (
  <html lang="en">
    <head>
      <Meta />
      <Links />
      <script
        data-domain="notes.code2d.org"
        defer
        src="https://plausible.io/js/script.js"
      ></script>
      <base target="_blank" />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

export default (): JSX.Element => <Outlet />;
