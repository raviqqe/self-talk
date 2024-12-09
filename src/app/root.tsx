import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { styled } from "@linaria/react";
import { useStore } from "@nanostores/react";
import { useAsync } from "@raviqqe/react-hooks";
import { type ReactNode } from "react";
import {
  Links,
  type LinksFunction,
  Meta,
  type MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useNavigation,
} from "react-router";
import { configuration } from "../configuration.js";
import { Loader } from "../infrastructure/react/Loader.js";
import { applicationInitializer } from "../main/application-initializer.js";
import { authenticationPresenter } from "../main/authentication-presenter.js";
import { globalStyle } from "../infrastructure/react/style.js";

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

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  useAsync(() => applicationInitializer.initialize(), []);

  const signedIn = useStore(authenticationPresenter.signedIn);
  const navigate = useNavigate();
  const { location } = useNavigation();

  useAsync(async () => {
    await navigate(signedIn ? "/documents" : "/");
  }, [signedIn]);

  return (
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
        <style className={globalStyle} />
      </head>
      <body>
        {location ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          children
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default (): JSX.Element => <Outlet />;
