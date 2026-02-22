import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

/** Prevents CDN from caching HTML so deploys show fresh content. s-maxage=0 overrides Next.js default s-maxage=31536000 for pages. */
const noCdnCacheHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=0, s-maxage=0, must-revalidate",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/", headers: noCdnCacheHeaders },
      { source: "/ai/:path*", headers: noCdnCacheHeaders },
      { source: "/login", headers: noCdnCacheHeaders },
      { source: "/register", headers: noCdnCacheHeaders },
      { source: "/auth/:path*", headers: noCdnCacheHeaders },
      { source: "/payment/:path*", headers: noCdnCacheHeaders },
      { source: "/email/:path*", headers: noCdnCacheHeaders },
      { source: "/contact", headers: noCdnCacheHeaders },
      { source: "/privacy", headers: noCdnCacheHeaders },
      { source: "/terms", headers: noCdnCacheHeaders },
      { source: "/cookie-policy", headers: noCdnCacheHeaders },
    ];
  },
};

const sentryOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
};

export default process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(nextConfig, sentryOptions)
  : nextConfig;
