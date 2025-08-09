import puppeteer from "puppeteer"
import fs from "fs"
import he from "html-entities"

const bookChapters = [
  "https://ctext.org/shang-shu/canon-of-yao",
  "https://ctext.org/shang-shu/canon-of-shun",
  "https://ctext.org/shang-shu/counsels-of-the-great-yu",
  "https://ctext.org/shang-shu/counsels-of-gao-yao",
  "https://ctext.org/shang-shu/yi-and-ji",

  "https://ctext.org/shang-shu/tribute-of-yu",
  "https://ctext.org/shang-shu/speech-at-gan",
  "https://ctext.org/shang-shu/songs-of-the-five-sons",
  "https://ctext.org/shang-shu/punitive-expedition-of-yin",

  "https://ctext.org/shang-shu/speech-of-tang",
  "https://ctext.org/shang-shu/announcement-of-zhong-hui",
  "https://ctext.org/shang-shu/announcement-of-tang",
  "https://ctext.org/shang-shu/instructions-of-yi",
  "https://ctext.org/shang-shu/tai-jia-i",
  "https://ctext.org/shang-shu/tai-jia-ii",
  "https://ctext.org/shang-shu/tai-jia-iii",
  "https://ctext.org/shang-shu/common-possession-of-pure-virtue",
  "https://ctext.org/shang-shu/pan-geng-i",
  "https://ctext.org/shang-shu/pan-geng-ii",
  "https://ctext.org/shang-shu/pan-geng-iii",
  "https://ctext.org/shang-shu/charge-to-yue-i",
  "https://ctext.org/shang-shu/charge-to-yue-ii",
  "https://ctext.org/shang-shu/charge-to-yue-iii",
  "https://ctext.org/shang-shu/day-of-the-supplementary-sacrifice-to",
  "https://ctext.org/shang-shu/chief-of-the-wests-conquest-of-li",
  "https://ctext.org/shang-shu/count-of-wei",

  "https://ctext.org/shang-shu/great-declaration-i",
  "https://ctext.org/shang-shu/great-declaration-ii",
  "https://ctext.org/shang-shu/great-declaration-iii",
  "https://ctext.org/shang-shu/speech-at-mu",
  "https://ctext.org/shang-shu/successful-completion-of-the-war",
  "https://ctext.org/shang-shu/great-plan",
  "https://ctext.org/shang-shu/hounds-of-lu",
  "https://ctext.org/shang-shu/metal-bound-coffer",
  "https://ctext.org/shang-shu/great-announcement",
  "https://ctext.org/shang-shu/charge-to-the-count-of-wei",
  "https://ctext.org/shang-shu/announcement-to-the-prince-of-kang",
  "https://ctext.org/shang-shu/announcement-about-drunkenness",
  "https://ctext.org/shang-shu/timber-of-the-rottlera",
  "https://ctext.org/shang-shu/announcement-of-the-duke-of-shao",
  "https://ctext.org/shang-shu/announcement-concerning-luo",
  "https://ctext.org/shang-shu/numerous-officers",
  "https://ctext.org/shang-shu/against-luxurious-ease",
  "https://ctext.org/shang-shu/prince-shi",
  "https://ctext.org/shang-shu/charge-to-zhong-of-cai",
  "https://ctext.org/shang-shu/numerous-regions",
  "https://ctext.org/shang-shu/establishment-of-government",
  "https://ctext.org/shang-shu/officers-of-zhou",
  "https://ctext.org/shang-shu/jun-chen",
  "https://ctext.org/shang-shu/testamentary-charge",
  "https://ctext.org/shang-shu/announcement-of-king-kang",
  "https://ctext.org/shang-shu/charge-to-the-duke-of-bi",
  "https://ctext.org/shang-shu/kun-ya",
  "https://ctext.org/shang-shu/charge-to-jiong",
  "https://ctext.org/shang-shu/marquis-of-lu-on-punishments",
  "https://ctext.org/shang-shu/charge-to-the-marquis-wen",
  "https://ctext.org/shang-shu/speech-at-bi",
  "https://ctext.org/shang-shu/speech-of-the-marquis-of-qin",
]

const exclusions = new Map([
  ["https://ctext.org/shang-shu/canon-of-yao", new Set([0])],
  ["https://ctext.org/shang-shu/canon-of-shun", new Set([0])],
  ["https://ctext.org/shang-shu/counsels-of-the-great-yu", new Set([0])],
  ["https://ctext.org/shang-shu/tribute-of-yu", new Set([0])],
  ["https://ctext.org/shang-shu/speech-at-gan", new Set([0])],
  ["https://ctext.org/shang-shu/songs-of-the-five-sons", new Set([0])],
  ["https://ctext.org/shang-shu/punitive-expedition-of-yin", new Set([0])],
  ["https://ctext.org/shang-shu/speech-of-tang", new Set([0])],
  ["https://ctext.org/shang-shu/announcement-of-zhong-hui", new Set([0])],
  ["https://ctext.org/shang-shu/announcement-of-tang", new Set([0])],
  ["https://ctext.org/shang-shu/instructions-of-yi", new Set([0])],
  ["https://ctext.org/shang-shu/tai-jia-i", new Set([0])],
  ["https://ctext.org/shang-shu/common-possession-of-pure-virtue", new Set([1, 2, 3, 4, 5, 6])],
  ["https://ctext.org/shang-shu/pan-geng-i", new Set([0])],
  ["https://ctext.org/shang-shu/charge-to-yue-i", new Set([0])],
  ["https://ctext.org/shang-shu/day-of-the-supplementary-sacrifice-to", new Set([0])],
  ["https://ctext.org/shang-shu/chief-of-the-wests-conquest-of-li", new Set([0])],
  ["https://ctext.org/shang-shu/count-of-wei", new Set([0])],
  ["https://ctext.org/shang-shu/great-declaration-i", new Set([0])],
  ["https://ctext.org/shang-shu/speech-at-mu", new Set([0])],
  ["https://ctext.org/shang-shu/successful-completion-of-the-war", new Set([0])],
  ["https://ctext.org/shang-shu/great-plan", new Set([0])],
  ["https://ctext.org/shang-shu/hounds-of-lu", new Set([0])],
  ["https://ctext.org/shang-shu/metal-bound-coffer", new Set([0])],
  ["https://ctext.org/shang-shu/great-announcement", new Set([0])],
  ["https://ctext.org/shang-shu/charge-to-the-count-of-wei", new Set([0])],
  ["https://ctext.org/shang-shu/announcement-to-the-prince-of-kang", new Set([0])],
  ["https://ctext.org/shang-shu/announcement-of-the-duke-of-shao", new Set([0])],
  ["https://ctext.org/shang-shu/announcement-concerning-luo", new Set([0])],
  ["https://ctext.org/shang-shu/numerous-officers", new Set([0])],
  ["https://ctext.org/shang-shu/against-luxurious-ease", new Set([0])],
  ["https://ctext.org/shang-shu/prince-shi", new Set([0])],
  ["https://ctext.org/shang-shu/charge-to-zhong-of-cai", new Set([0])],
  ["https://ctext.org/shang-shu/numerous-regions", new Set([0])],
  ["https://ctext.org/shang-shu/establishment-of-government", new Set([0])],
  ["https://ctext.org/shang-shu/officers-of-zhou", new Set([0])],
  ["https://ctext.org/shang-shu/jun-chen", new Set([0])],
  ["https://ctext.org/shang-shu/testamentary-charge", new Set([0])],
  ["https://ctext.org/shang-shu/announcement-of-king-kang", new Set([0])],
  ["https://ctext.org/shang-shu/charge-to-the-duke-of-bi", new Set([0])],
  ["https://ctext.org/shang-shu/kun-ya", new Set([0])],
  ["https://ctext.org/shang-shu/charge-to-jiong", new Set([0])],
  ["https://ctext.org/shang-shu/marquis-of-lu-on-punishments", new Set([0])],
  ["https://ctext.org/shang-shu/charge-to-the-marquis-wen", new Set([0])],
  ["https://ctext.org/shang-shu/speech-at-bi", new Set([0])],
  ["https://ctext.org/shang-shu/speech-of-the-marquis-of-qin", new Set([0])],
])

async function main() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const chapters = bookChapters

  let i = 0
  const sections = {}
  for (const chapterUrl of chapters) {
    i++
    const no = romanize(i)
    const title = `Shu Jing ${no}`
    console.log(`Scrapping ${title}`)

    const { en, zh } = await scrapePage(page, chapterUrl)

    console.log(`Parsing ${title}`)
    sections[no.toLowerCase()] = {
      en: parseSections(en, title),
      zh: parseSections(zh, title),
    }

    console.log(`Succes scrapping ${title}`)
    console.log(`===================`)
  }

  await browser.close()

  const resultText = JSON.stringify(sections)
  fs.writeFileSync(`./result.json`, resultText)
}

async function scrapePage(page, url) {
  await page.goto(url)
  await page.setViewport({width: 1080, height: 1024})

  const enTexts = await page.$$eval("#content3 tr td[class='etext']", items => items.map((content) => {
    return content.innerText
  }))
  const enTitles = await page.$$eval("#content3 tr td[class='etext opt']", items => items.map((content) => {
    return content.innerText
  }))

  const zhTexts = await page.$$eval("#content3 tr td[class='ctext']", items => items.map((content) => {
    return content.innerText
  }))
  const zhTitles = await page.$$eval("#content3 tr td[class='ctext opt']", items => items.map((content) => {
    return content.innerText
  }))
  

  let resEnTexts = []
  let resZhTexts = []
  let resEnTitles = []
  let resZhTitles = []
  const isLengthSame = enTexts.length == zhTexts.length && enTitles.length === zhTitles.length
  if (!isLengthSame) {
    resEnTexts = enTexts
    resZhTexts = zhTexts
    resEnTitles = enTitles
    resZhTitles = zhTitles
  } else {
    console.warn("Content length is different, URL: ", {
      url,
      enTexts: enTexts.length,
      zhTexts: zhTexts.length,
      enTitles: enTitles.length,
      zhTitles: zhTitles.length,
    })

    for (let i = 0; i < enTexts.length; i++) {
      if (exclusions.has(url)) {
        const setting = exclusions.get(url)
        console.log([i, setting, setting.has(i)])
        if (setting.has(i)) {
          continue
        }
      }

      resEnTexts.push(enTexts[i])
      resZhTexts.push(zhTexts[i])
      resEnTitles.push(enTitles[i])
      resZhTitles.push(zhTitles[i])
    }

    console.warn("New Content length, URL: ", {
      url,
      enTexts: resEnTexts.length,
      zhTexts: resZhTexts.length,
      enTitles: resEnTitles.length,
      zhTitles: resZhTitles.length,
    })
  }

  const enSections = []
  const zhSections = []
  for (let i = 0; i < resEnTexts.length; i++) {
    enSections.push({
      title: resEnTitles[i],
      content: resEnTexts[i]
    })

    zhSections.push({
      title: resZhTitles[i],
      content: resZhTexts[i]
    })
  }

  return {
    en: enSections,
    zh: zhSections,
  }
}

function parseSections(sections, title) {
  let no = 0
  const result = {}
  for (let i = 0; i < sections.length; i++) {
    no++
    const section = sections[i]

    if (section.title === "") {
      no--

      const prevSection = result[no]
      const prevContent = prevSection.content
      const content = prevContent + he.encode(`<p>${section.content}</p>`)

      result[no] = {
        ...prevSection,
        content
      }
    } else {
      result[no] = {
        title: `${title}:${no}`,
        description: "",
        content: he.encode(`<p>${section.content}</p>`)
      }
    }
  }

  return result
}

function romanize(num) {
  if (isNaN(num))
      return NaN;
  var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
  while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

main()
