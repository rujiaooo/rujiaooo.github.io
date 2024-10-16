import idMenus from "./id/menus.json"
import idHome from "./id/home.json"
import idContact from "./id/contact.json"
import idMusics from "./id/musics.json"
import idMusicDetail from "./id/music-detail.json"
import idNotFound from "./id/not-found.json"
import idComingSoon from "./id/coming-soon.json"
import idTranslation from "./id/translation.json"

import enMenus from "./en/menus.json"
import enHome from "./en/home.json"
import enContact from "./en/contact.json"
import enMusics from "./en/musics.json"
import enMusicDetail from "./en/music-detail.json"
import enNotFound from "./en/not-found.json"
import enComingSoon from "./en/coming-soon.json"
import enTranslation from "./en/translation.json"

import zhMenus from "./zh/menus.json"
import zhHome from "./zh/home.json"
import zhContact from "./zh/contact.json"
import zhMusics from "./zh/musics.json"
import zhMusicDetail from "./zh/music-detail.json"
import zhNotFound from "./zh/not-found.json"
import zhComingSoon from "./zh/coming-soon.json"
import zhTranslation from "./zh/translation.json"

export const lngs = ["id", "en", "zh"]

export const resources = {
  id: {
    "menus": idMenus,
    "home": idHome,
    "contact": idContact,
    "musics": idMusics,
    "music-detail": idMusicDetail,
    "not-found": idNotFound,
    "coming-soon": idComingSoon,
    "translation": idTranslation,
  },
  en: {
    "menus": enMenus,
    "home": enHome,
    "contact": enContact,
    "musics": enMusics,
    "music-detail": enMusicDetail,
    "not-found": enNotFound,
    "coming-soon": enComingSoon,
    "translation": enTranslation,
  },
  zh: {
    "menus": zhMenus,
    "home": zhHome,
    "contact": zhContact,
    "musics": zhMusics,
    "music-detail": zhMusicDetail,
    "not-found": zhNotFound,
    "coming-soon": zhComingSoon,
    "translation": zhTranslation,
  },
}