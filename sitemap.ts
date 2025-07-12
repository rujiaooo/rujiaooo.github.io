import { generateSitemap } from "./src/scripts/Sitemap"
import { resources, lngs } from "./src/assets/locales"
import { initTranslator } from "./src/features/Translation"

initTranslator({
  fallbackLng: "id",
  supportedLngs: lngs,
  defaultNS: [
    "translation", "menus", 
    "musics", "books"
  ],
  resources
})
generateSitemap({
  baseUrl: `https://rujiao.web.id`,
  location: `snap-build/sitemap.xml`
})