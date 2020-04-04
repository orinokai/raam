/** @jsx jsx */
import { jsx, Box, Heading, Link } from "theme-ui";
import Highlight, { defaultProps } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import * as Raam from "raam";

const Code = ({ children, className, live }) => {
  const language = className.replace(/language-/, "");
  if (live) {
    return (
      <Box
        sx={{
          display: "block",
          border: "primary",
          overflow: "hidden",
        }}
      >
        <LiveProvider
          code={children}
          transformCode={code => "/** @jsx jsx */" + code}
          scope={{ jsx, Box, Heading, Link, ...Raam }}
        >
          <Box
            as={LivePreview}
            sx={{ fontFamily: "body", borderBottom: "primary" }}
          />
          <Box as={LiveEditor} sx={{ padding: 3, backgroundColor: "text" }} />
          <Box
            as={LiveError}
            sx={{
              padding: 3,
              borderTop: "primary",
              borderColor: "error",
              color: "muted",
              backgroundColor: "text",
            }}
          />
        </LiveProvider>
      </Box>
    );
  }
  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box as="pre" className={className} sx={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Box>
      )}
    </Highlight>
  );
};

export default Code;
