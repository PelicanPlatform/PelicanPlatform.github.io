/**
 * Remote images that next-image-export-optimizer should download and optimize
 * at build time.
 *
 * Staff headshots do not live in this repository. `getStaff` returns absolute
 * URLs on chtc.github.io, and the optimizer only generates variants for images
 * it is told about in advance. Without this file every headshot on /team
 * renders a path that nothing ever writes, which is a silent 404 per person.
 *
 * The list is produced by the build rather than fetched again here. `pnpm run
 * export` runs `next build` first, and rendering /team calls `getStaff` and
 * writes every portrait it used to `.staff-images.json` (see
 * `utils/staffImages.ts`). Reading that back means the optimizer works from
 * exactly the URLs the page rendered, with no second copy of the repository
 * coordinates, the YAML parsing or the website filter to keep in sync.
 */

const { readFileSync } = require('node:fs');
const { join } = require('node:path');

// Repeated from `utils/staffImages.ts`, which this file cannot import: the
// package is ESM and this is CommonJS, loaded by the optimizer via require().
const STAFF_IMAGE_MANIFEST = '.staff-images.json';

function readStaffImages() {
  const path = join(__dirname, STAFF_IMAGE_MANIFEST);

  let urls;
  try {
    urls = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    throw new Error(
      `Could not read ${STAFF_IMAGE_MANIFEST}: ${error.message}. ` +
        `It is written while /team renders, so run \`next build\` before the ` +
        `image optimizer (\`pnpm run export\` does this in order).`
    );
  }

  // An empty list means the team page rendered nobody. Failing here costs a
  // build; not failing costs a page of broken portraits that nobody notices
  // until someone looks at /team.
  if (!Array.isArray(urls) || urls.length === 0) {
    throw new Error(
      `${STAFF_IMAGE_MANIFEST} is empty. The team page rendered no staff, so ` +
        `check the staff list source and the website filter in app/team/page.tsx.`
    );
  }

  console.log(`[remoteOptimizedImages] ${urls.length} staff images`);
  return urls;
}

module.exports = readStaffImages();
