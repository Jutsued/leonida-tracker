// app/robots.js
// Generates /robots.txt and points crawlers at the sitemap.

import { SITE_URL } from "@/lib/site";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
