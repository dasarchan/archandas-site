import { getCollection } from "astro:content";
import { getPostUrl } from "../lib/posts";

const site = "https://archandas.com";
const staticPages = ["/", "/about/", "/blog/", "/projects/"];

export async function GET() {
  const posts = (await getCollection("posts")).filter((post) => !post.data.draft);
  const urls = [
    ...staticPages,
    ...posts.map((post) => getPostUrl(post)),
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map((path) => `<url><loc>${site}${path}</loc></url>`).join("")}
    </urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
}
