import { Box, List, ListItem, Typography } from '@mui/material';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
// GitHub authors this content (release notes, security advisories) in GitHub
// Flavored Markdown, so tables/strikethrough/autolinks need the GFM extension —
// without it a table renders as a wall of pipe characters.
import remarkGfm from 'remark-gfm';

const MarkdownContainer = ({ content }: { content: string }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
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
          <Box component={'li'} sx={{mb:2}}>
            {children}
          </Box>
        ),
        ul: ({ node, children }) => (
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>{children}</ul>
        ),
        ol: ({ node, children }) => (
          <ol style={{ paddingLeft: '1.2rem', marginBottom: '1rem' }}>{children}</ol>
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
        // Wide tables scroll inside their own box rather than pushing the page
        // sideways on mobile.
        table: ({ node, children }) => (
          <Box sx={{ overflowX: 'auto', mb: 3 }}>
            <Box
              component='table'
              sx={{
                borderCollapse: 'collapse',
                width: '100%',
                fontSize: '0.95rem',
                '& th, & td': {
                  border: '1px solid #E4ECF8',
                  p: 1.25,
                  textAlign: 'left',
                  verticalAlign: 'top',
                },
                '& th': { backgroundColor: '#F7FAFE', fontWeight: 700 },
              }}
            >
              {children}
            </Box>
          </Box>
        ),
        pre: ({ node, children }) => (
          <Box
            component='pre'
            sx={{
              backgroundColor: '#F7FAFE',
              border: '1px solid #E4ECF8',
              borderRadius: '10px',
              p: 2,
              mb: 3,
              overflowX: 'auto',
              fontSize: '0.875rem',
              lineHeight: 1.6,
            }}
          >
            {children}
          </Box>
        ),
        code: ({ node, className, children }) => {
          // react-markdown gives fenced blocks a `language-*` class; those are
          // already wrapped by `pre` above, so only inline code gets a chip.
          const isBlock = (className || '').startsWith('language-');
          return (
            <Box
              component='code'
              className={className}
              sx={
                isBlock
                  ? { fontFamily: 'monospace' }
                  : {
                      fontFamily: 'monospace',
                      backgroundColor: '#F0F5FD',
                      borderRadius: '5px',
                      px: 0.6,
                      py: 0.2,
                      wordBreak: 'break-word',
                    }
              }
            >
              {children}
            </Box>
          );
        },
        blockquote: ({ node, children }) => (
          <Box
            component='blockquote'
            sx={{
              borderLeft: '4px solid #E4ECF8',
              m: 0,
              mb: 3,
              pl: 2,
              color: '#56638A',
              '& p': { mb: 0 },
            }}
          >
            {children}
          </Box>
        ),
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownContainer;
