import MarkdownContainer from '@/components/MarkdownContainer';

const ReleaseBody = ({ content }: { content: string }) => {
  // Format 40-character hex strings as links to GitHub commits
  const formatted = content.replace(
    /([0-9A-Fa-f]{40})/g,
    (match, _hash, offset, fullText) => {
      // Ensure the hash is not part of a markdown link like (text)[url]
      const afterIndex = offset + match.length;
      const after = fullText.substring(afterIndex, afterIndex + 1);

      if (after === ')' || after === ']') {
        // do not modify
        return match;
      } else {
        return `[${match.substring(0, 8)}](https://github.com/PelicanPlatform/pelican/commit/${match})`;
      }
    }
  );

  return <MarkdownContainer content={formatted} />;
};

export default ReleaseBody;
