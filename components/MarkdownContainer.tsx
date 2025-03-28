import { Box, List, ListItem, Typography } from '@mui/material';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const MarkdownContainer = ({ content }: { content: string }) => {
  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ node, children }) => (
          <Typography variant='h4' component={"h2"} gutterBottom>
            {children}
          </Typography>
        ),
        h2: ({ node, children }) => (
          <Typography variant='h5' component={"h3"} gutterBottom>
            {children}
          </Typography>
        ),
        h3: ({ node, children }) => (
          <Typography variant='h6' component={"h4"} gutterBottom>
            {children}
          </Typography>
        ),
        h4: ({ node, children }) => (
          <Typography variant='subtitle1' pb={2} gutterBottom>
            {children}
          </Typography>
        ),
        h5: ({ node, children }) => (
          <Typography variant='subtitle2' pb={2} gutterBottom>
            {children}
          </Typography>
        ),
        h6: ({ node, children }) => (
          <Typography variant='caption'>{children}</Typography>
        ),
        p: ({ node, children }) => (
          <Typography variant='body1' paragraph>
            {children}
          </Typography>
        ),
        li: ({ node, children }) => (
          <li>
            {children}
          </li>
        ),
        ul: ({ node, children }) => (
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>{children}</ul>
        ),
        a: ({ children, href }) => (
          <Typography component='a' href={href} style={{ color: '#0885ff' }}>
            {children}
          </Typography>
        ),
        strong: ({ node, children }) => (
          <Box component='span' display='inline' fontWeight='bold'>
            {children}
          </Box>
        ),
        text: ({ node, children }) => (
          <Typography variant='body1' display='inline'>
            {children}
          </Typography>
        ),
        div: ({ node, children }) => <Box>{children}</Box>,
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownContainer;
