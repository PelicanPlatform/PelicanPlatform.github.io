import { Box, List, ListItem, Typography } from '@mui/material';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const MarkdownContainer = ({ content }: { content: string }) => {
  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ node, children }) => (
          <Typography variant='h4' pb={2}>
            {children}
          </Typography>
        ),
        h2: ({ node, children }) => (
          <Typography variant='h5' pb={2}>
            {children}
          </Typography>
        ),
        h3: ({ node, children }) => (
          <Typography variant='h6' pb={2}>
            {children}
          </Typography>
        ),
        h4: ({ node, children }) => (
          <Typography variant='subtitle1' pb={2}>
            {children}
          </Typography>
        ),
        h5: ({ node, children }) => (
          <Typography variant='subtitle2' pb={2}>
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
          <ListItem disablePadding sx={{ display: 'inline' }}>
            {children}
            <br />
          </ListItem>
        ),
        ul: ({ node, children }) => (
          <List style={{ paddingLeft: '1rem' }}>{children}</List>
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
