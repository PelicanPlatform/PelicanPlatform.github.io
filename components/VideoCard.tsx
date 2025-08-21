import { Box, Button, GridLegacy, Typography } from '@mui/material';
import { TopStyledBlock } from '@chtc/web-components';

interface VideoCardProps {
  src: string;
  description: string;
  title: string;
  author: string;
  button?: {
    text: string;
    href: string;
  };
}

const VideoCard = ({
  src,
  description,
  title,
  author,
  button,
}: VideoCardProps) => {
  // On load update the iframes height so the video is 16:9

  return (
    <GridLegacy container>
      <GridLegacy item xs={12} md={7}>
        <iframe
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: '16 / 9',
          }}
          src={src}
          title={title}
          allow={
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          }
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        />
      </GridLegacy>
      <GridLegacy item xs={12} md={5} display={'flex'}>
        <Box sx={{ m: 2, mt: 5, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <TopStyledBlock>
              <Typography variant={'h4'}>{title}</Typography>
            </TopStyledBlock>
            <Typography variant={'h6'}>{author}</Typography>
            <Typography variant={'body1'} sx={{ mt: 2 }}>
              {description}
            </Typography>
          </Box>
          {button && (
            <Button sx={{ mt: 'auto' }} href={button.href}>
              {button.text}
            </Button>
          )}
        </Box>
      </GridLegacy>
    </GridLegacy>
  );
};

export default VideoCard;
