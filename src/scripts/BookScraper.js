import puppeteer from "puppeteer"
import fs from "fs"
import he from "html-entities"

const bookChapters = [
  "https://ctext.org/book-of-poetry/odes-of-zhou-and-the-south",
  "https://ctext.org/book-of-poetry/odes-of-shao-and-the-south",
  "https://ctext.org/book-of-poetry/odes-of-bei",
  "https://ctext.org/book-of-poetry/odes-of-yong",
  "https://ctext.org/book-of-poetry/odes-of-wei",
  "https://ctext.org/book-of-poetry/odes-of-wang",
  "https://ctext.org/book-of-poetry/odes-of-zheng",
  "https://ctext.org/book-of-poetry/odes-of-qi",
  "https://ctext.org/book-of-poetry/odes-of-wei1",
  "https://ctext.org/book-of-poetry/odes-of-tang",
  "https://ctext.org/book-of-poetry/odes-of-qin",
  "https://ctext.org/book-of-poetry/odes-of-chen",
  "https://ctext.org/book-of-poetry/odes-of-gui",
  "https://ctext.org/book-of-poetry/odes-of-cao",
  "https://ctext.org/book-of-poetry/odes-of-bin",

  "https://ctext.org/book-of-poetry/decade-of-lu-ming",
  "https://ctext.org/book-of-poetry/decade-of-baihua",
  "https://ctext.org/book-of-poetry/decade-of-tong-gong",
  "https://ctext.org/book-of-poetry/decade-of-qi-fu",
  "https://ctext.org/book-of-poetry/decade-of-xiao-min",
  "https://ctext.org/book-of-poetry/decade-of-bei-shan",
  "https://ctext.org/book-of-poetry/decade-of-sang-hu",
  "https://ctext.org/book-of-poetry/decade-of-du-ren-shi",

  "https://ctext.org/book-of-poetry/decade-of-wen-wang",
  "https://ctext.org/book-of-poetry/decade-of-sheng-min",
  "https://ctext.org/book-of-poetry/decade-of-dang",

  "https://ctext.org/book-of-poetry/decade-of-qing-miao",
  "https://ctext.org/book-of-poetry/decade-of-chen-gong",
  "https://ctext.org/book-of-poetry/decade-of-min-yu-xiao-zi",
  "https://ctext.org/book-of-poetry/praise-odes-of-lu",
  "https://ctext.org/book-of-poetry/sacrificial-odes-of-shang",
]

async function main() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const chapters = bookChapters

  let i = 0
  const sections = {}
  for (const chapterUrl of chapters) {
    i++
    const no = romanize(i)
    const title = `Shi Jing ${no}`
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
  

  if (enTexts.length != zhTexts.length || enTitles.length !== zhTitles.length) {
    console.log("Content length is not valid")
    return
  }

  const enSections = []
  const zhSections = []
  for (let i = 0; i < enTexts.length; i++) {
    enSections.push({
      title: enTitles[i],
      content: enTexts[i]
    })

    zhSections.push({
      title: zhTitles[i],
      content: zhTexts[i]
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
