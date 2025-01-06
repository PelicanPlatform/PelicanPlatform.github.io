
import { Container, Link, Typography, Box } from '@mui/material';
import ArrowRight from '@/components/svg/arrowright';

interface Release {
  id: number;
  name: string;
  published_at: string;
  html_url: string;
}

const getReleases = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/PelicanPlatform/pelican/releases');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching releases:', error);
  }
}

const Releases = async () => {
  const releases = await getReleases();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  };
  const style = {
		transition: "box-shadow .2s",
		boxShadow: "grey 1px 1px 3px",
		"&:hover": {boxShadow: "grey 1px 1px 5px"},
    backgroundColor: "#FFFFFF",
    paddingTop: "1em",
	}
  return (
    <Box borderRadius={2} overflow={"hidden"} sx={style} >
      {Array.isArray(releases) && (
        <Container style={{ display: 'flex', flexDirection: 'column'}}>
          {releases.slice(0, 4).map((release) => (
            <div key={release.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:"0.5em"}}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" fontWeight="bold" align="left">
                  <Link href={`/releases/${release.name}`} underline="hover">
                    Release
                  </Link>
                </Typography>
                <Typography variant="body1" align="left" color="gray">
                  {formatDate(release.published_at)}
                </Typography>
              </div>
              <Typography variant="h3" fontWeight="bold" align="right" color={"#3A3B3C"}>
                  {release.name}
              </Typography>
            </div>
          ))}
        </Container>
      )}
      <Link href={"/releases"} underline='always'>
      <Typography 
        variant={"h6"} 
        sx={{
          paddingLeft: "1em", 
          paddingBottom: "1em",
          transition: 'padding-right 0.3s ease-in-out',
          '&:hover': {
            '.arrow-icon': {
              transform: 'translateX(0.3em)',
            },
          },
          '.arrow-icon': {
            paddingLeft: '0.3em',
            transition: 'transform 0.3s ease-in-out',
          }
        }} 
        align='left'
      >
        All Releases
        <ArrowRight className="arrow-icon" height={18} width={24} fill={"currentColor"}/>
      </Typography>

      </Link>


    </Box>
  );
  };

export default Releases;