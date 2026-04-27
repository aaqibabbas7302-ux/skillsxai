import puppeteer from 'puppeteer'

let browserInstance: Awaited<ReturnType<typeof puppeteer.launch>> | null = null

async function getBrowser() {
  if (browserInstance && browserInstance.connected) return browserInstance
  browserInstance = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-web-security',
      '--disable-features=IsolateOrigins',
      '--disable-site-isolation-trials',
    ],
  })
  return browserInstance
}

export async function htmlToPdf(html: string, landscape = false): Promise<Buffer> {
  const browser = await getBrowser()
  const page = await browser.newPage()
  try {
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const type = req.resourceType()
      if (['image', 'font', 'media'].includes(type)) {
        req.abort()
      } else {
        req.continue()
      }
    })

    await page.setContent(html, {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    })

    const pdf = await page.pdf({
      format: 'A4',
      landscape,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      timeout: 15000,
    })
    return Buffer.from(pdf)
  } finally {
    await page.close()
  }
}

export async function htmlFileToPdf(htmlBuffer: Buffer, landscape = false): Promise<Buffer> {
  return htmlToPdf(htmlBuffer.toString('utf-8'), landscape)
}
