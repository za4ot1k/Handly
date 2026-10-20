const config = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
  images: { unoptimized: true },
  // With output: 'export', distDir names the static export directory.
  distDir: process.env.NODE_ENV === 'production' ? 'out' : '.next',
};
export default config;
