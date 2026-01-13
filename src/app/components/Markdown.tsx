import type { DetailedHTMLProps, ImgHTMLAttributes, JSX } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./Markdown.module.css";

const Image = (
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
) => (
  // biome-ignore lint/a11y/useAltText: TODO
  // biome-ignore lint/a11y/useKeyWithClickEvents: TODO
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
  <div className={styles.root}>
    <ReactMarkdown components={{ img: Image }} remarkPlugins={[remarkGfm]}>
      {children}
    </ReactMarkdown>
  </div>
);
