import { createFileRoute, notFound } from "@tanstack/react-router";
import { PROPERTIES } from "@/lib/properties";
import { PropertyDetail } from "@/components/PropertyDetail";

export const Route = createFileRoute("/vente-terrain/$id")({
  loader: ({ params }) => {
    const property = PROPERTIES.find(
      (p) => p.id === params.id || p.slug === `/vente-terrain/${params.id}`
    );
    if (!property) throw notFound();
    return property;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Terrain à vendre Djerba` },
          { name: "description", content: loaderData.shortDescription },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.shortDescription },
          { property: "og:image", content: loaderData.images[0] },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
      Bien introuvable.
    </div>
  ),
  component: () => {
    const property = Route.useLoaderData();
    return <PropertyDetail property={property} />;
  },
});
