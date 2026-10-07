import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { Staff } from '@chtc/web-components';

/**
 * Where the build leaves the list of remote staff portraits for
 * `remoteOptimizedImages.js` to read.
 *
 * The export runs `next build` before `next-image-export-optimizer`, so the
 * team page has already called `getStaff` and resolved every image URL by the
 * time the optimizer looks for this file. Writing the list here rather than
 * re-deriving it means the optimizer works from exactly the URLs the page
 * rendered, and the staff list is fetched once per build instead of twice.
 *
 * Gitignored and rewritten on every build. The filename is repeated in
 * `remoteOptimizedImages.js`, which is plain CommonJS and cannot import this
 * module.
 */
export const STAFF_IMAGE_MANIFEST = '.staff-images.json';

/**
 * Record the portraits of the staff this site actually renders, so they get
 * downloaded and optimised alongside the images committed to this repo.
 */
export async function recordStaffImages(staff: Staff[]): Promise<void> {
  const urls = Array.from(new Set(staff.map((member) => member.image)))
    .filter(Boolean)
    .sort();

  await writeFile(
    join(process.cwd(), STAFF_IMAGE_MANIFEST),
    `${JSON.stringify(urls, null, 2)}\n`
  );
}
