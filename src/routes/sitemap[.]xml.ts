import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PROPERTIES } from "@/lib/properties";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/",
          "/vente/maisons",
          "/vente/terrains",
          "/location/saisonniere",
          "/location/annuelle",
          "/a-propos",
          "/contact",
        ];
        const all = [
          ...staticPaths.map((p) => `<url><loc>${BASE_URL}${p}</loc></url>`),
          ...PROPERTIES.map((p) => `<url><loc>${BASE_URL}${p.slug}</loc></url>`),
        ].join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
