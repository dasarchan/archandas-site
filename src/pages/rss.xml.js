import { getCollection } from "astro:content";
import { getPostUrl } from "../lib/posts";

const site = "https://archandas.com";

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const posts = (await getCollection("posts"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const items = posts
    .map((post) => {
      const url = `${site}${getPostUrl(post)}`;

      return `
        <item>
          <title>${escapeXml(post.data.title)}</title>
          <description>${escapeXml(post.data.description)}</description>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
        </item>`;
    })
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Archan Das</title>
        <description>Writing and notes from Archan Das.</description>
        <link>${site}</link>
        ${items}
      </channel>
    </rss>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
}
