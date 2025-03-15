import puppeteer from "puppeteer"
import fs from "fs"
import he from "html-entities"

const lijingChapters = [
  "https://ctext.org/liji/qu-li-i",
  "https://ctext.org/liji/qu-li-ii",
  "https://ctext.org/liji/tan-gong-i",
  "https://ctext.org/liji/tan-gong-ii",
  "https://ctext.org/liji/wang-zhi",
  "https://ctext.org/liji/yue-ling",
  "https://ctext.org/liji/zengzi-wen",
  "https://ctext.org/liji/wen-wang-shi-zi",
  "https://ctext.org/liji/li-yun",
  "https://ctext.org/liji/li-qi",
  "https://ctext.org/liji/jiao-te-sheng",
  "https://ctext.org/liji/nei-ze",
  "https://ctext.org/liji/yu-zao",
  "https://ctext.org/liji/ming-tang-wei",
  "https://ctext.org/liji/sang-fu-xiao-ji",
  "https://ctext.org/liji/da-zhuan",
  "https://ctext.org/liji/shao-yi",
  "https://ctext.org/liji/xue-ji",
  "https://ctext.org/liji/yue-ji",
  "https://ctext.org/liji/za-ji-i",
  "https://ctext.org/liji/za-ji-ii",
  "https://ctext.org/liji/sang-da-ji",
  "https://ctext.org/liji/ji-fa",
  "https://ctext.org/liji/ji-yi",
  "https://ctext.org/liji/ji-tong",
  "https://ctext.org/liji/jing-jie",
  "https://ctext.org/liji/ai-gong-wen",
  "https://ctext.org/liji/zhongni-yan-ju",
  "https://ctext.org/liji/kongzi-xian-ju",
  "https://ctext.org/liji/fang-ji",
  "https://ctext.org/liji/zhong-yong",
  "https://ctext.org/liji/biao-ji",
  "https://ctext.org/liji/zi-yi",
  "https://ctext.org/liji/ben-sang",
  "https://ctext.org/liji/wen-sang",
  "https://ctext.org/liji/fu-wen",
  "https://ctext.org/liji/jian-zhuan",
  "https://ctext.org/liji/san-nian-wen",
  "https://ctext.org/liji/shen-yi",
  "https://ctext.org/liji/tou-hu",
  "https://ctext.org/liji/ru-xing",
  "https://ctext.org/liji/da-xue",
  "https://ctext.org/liji/guan-yi",
  "https://ctext.org/liji/hun-yi",
  "https://ctext.org/liji/xiang-yin-jiu-yi",
  "https://ctext.org/liji/she-yi",
  "https://ctext.org/liji/yan-yi",
  "https://ctext.org/liji/pin-yi",
  "https://ctext.org/liji/sang-fu-si-zhi"
]

async function main() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const chapters = lijingChapters

  let i = 0
  const sections = {}
  for (const chapterUrl of chapters) {
    i++
    const no = romanize(i)
    const title = `Li Jing ${no}`
    console.log(`Scrapping ${title}`)

    const { en, zh } = await scrapePage(page, chapterUrl)

    console.log(`Parsing ${title}`)
    sections[no] = {
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
