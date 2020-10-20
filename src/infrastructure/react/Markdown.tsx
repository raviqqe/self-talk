import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled, { css } from "styled-components";
import { darkGrey, grey, red, white } from "./style/colors";

const Container = styled.div`
  cursor: text;
  overflow-x: auto;

  > :first-child {
    margin-top: 0em;
  }

  > :last-child {
    margin-bottom: 0em;
  }

  * {
    word-wrap: break-word;
  }

  ${[1, 2, 3, 4, 5, 6].map(
    (level) => css`
      h${level} {
        font-size: 1em;

        &::before {
          content: "${"#".repeat(level)} ";
        }
      }
    `
  )};

  a {
    color: ${red};

    &:visited {
      color: ${red};
    }
  }

  blockquote {
    color: ${darkGrey};
  }

  img {
    cursor: pointer;
    max-width: 100%;
  }

  pre {
    overflow-x: auto;
  }

  pre,
  *:not(pre) > code {
    background: ${darkGrey};
    border-radius: 0.2rem;
    color: ${white};
    font-size: 0.95em;
    padding: 0.4em;
  }

  *:not(pre) > code {
    line-height: 2.5em;
  }

  table {
    border-collapse: collapse;
  }

  table,
  td,
  th {
    border: 1px solid ${grey};
  }

  td,
  th {
    padding: 0.4em 0.6em;
  }
`;

const Image = ({ node: _, ...props }: { node: unknown; src: string }) => (
  <img
    onClick={(event) => {
      const parent = event.currentTarget.parentElement;

      if (parent && parent.tagName === "A") {
        return;
      }

      window.open(props.src, "_blank");
    }}
    {...props}
  />
);

interface IProps {
  children: string;
}

export const Markdown = ({ children }: IProps): JSX.Element => (
  <Container>
    <ReactMarkdown
      plugins={[remarkGfm]}
      renderers={{ image: Image }}
      source={children}
    />
  </Container>
);
