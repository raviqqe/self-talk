import { styled } from "@linaria/react";
import css from "noop-tag";
import {
  type DetailedHTMLProps,
  type ImgHTMLAttributes,
  type JSX,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { darkGrey, grey, red, white } from "../style.js";

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

  ${[1, 2, 3, 4, 5, 6]
    .map(
      (level) => css`
        h${level} {
          font-size: 1em;

          &::before {
            content: "${"#".repeat(level)} ";
          }
        }
      `,
    )
    .join("\n")};

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

const Image = (
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
) => (
  <img
    onClick={(event) => {
      if (event.currentTarget.parentElement?.tagName !== "A" && props.src) {
        window.open(props.src, "_blank");
      }
    }}
    {...props}
  />
);

interface Props {
  children: string;
}

export const Markdown = ({ children }: Props): JSX.Element => (
  <Container>
    <ReactMarkdown components={{ img: Image }} remarkPlugins={[remarkGfm]}>
      {children}
    </ReactMarkdown>
  </Container>
);
