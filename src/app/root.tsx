import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import configuration from "../configuration.json" with { type: "json" };
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
    property: "og:title",
    content: configuration.title,
  },
  {
    property: "og:description",
    content: configuration.description,
  },
  {
    property: "og:type",
    content: "website",
  },
  {
    property: "og:url",
    content: "https://notes.code2d.org",
  },
  {
    property: "og:image",
    content: "https://notes.code2d.org/icon.svg",
  },
  {
    name: "twitter:card",
    content: "summary",
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
        defer
        data-domain="notes.code2d.org"
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
