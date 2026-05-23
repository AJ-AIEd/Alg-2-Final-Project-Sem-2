import katex from "katex";

export default function Latex({ children, block = false }) {
  const html = katex.renderToString(children, {
    displayMode: block,
    throwOnError: false,
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
