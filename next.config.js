/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'development' ? undefined : 'export',
  images: {
    loader: 'custom',
    // Every entry here is a file generated for every source image, so the list
    // is kept to widths something on the site actually requests.
    //
    // `imageSizes` serves images with an explicit `sizes` prop: 96 for avatars
    // and header logos, 384 for staff cards and the branding page. 16 was
    // dropped because nothing on the site renders an image that small.
    imageSizes: [96, 384],
    // `deviceSizes` serves `fill` images: 640 covers phones at 1x, 1200 covers
    // them at 2x and desktops at 1x. 3840 was dropped because the only thing
    // reaching for it was a `fill` image missing a `sizes` prop, not a genuine
    // full-bleed 4K image — see the team cards.
    deviceSizes: [640, 1200],
  },
  transpilePackages: ['next-image-export-optimizer'],
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/static/images',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '75',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',

    // If you do not want to use blurry placeholder images, then you can set
    // nextImageExportOptimizer_generateAndUseBlurImages to false and pass
    // `placeholder="empty"` to all <ExportedImage> components.
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
