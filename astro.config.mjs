import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import remarkIns from "remark-ins";

export default defineConfig({
  site: "https://archandas.com",
  markdown: {
    processor: unified({ remarkPlugins: [remarkIns] }),
  },
});
