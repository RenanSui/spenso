import { type MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const routes = [
    "",
    "/dashboard/all-groups",
    "/dashboard/groups/",
    "/dashboard/settings/",
    "/guest/all-groups",
    "/guest/groups/",
    "/guest/settings/"
  ].map((route) => ({
    url: `http://localhost:3000${route}`,
    lastModified: new Date().toISOString()
  }))

  return [...routes]
}