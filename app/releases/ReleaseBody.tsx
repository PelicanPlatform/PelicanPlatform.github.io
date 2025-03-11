import MarkdownContainer from '@/components/MarkdownContainer';

const ReleaseBody = ({ content }: { content: string }) => {
  // Format 40-character hex strings as links to GitHub commits
  const formatted = content.replace(/([0-9A-Fa-f]{40})/g, (fullCommit) => {
    return `[${fullCommit.substring(0, 8)}](https://github.com/PelicanPlatform/pelican/commit/${fullCommit})`;
  });
  console.log(formatted);
  return <MarkdownContainer content={formatted} />;
};

export default ReleaseBody;
