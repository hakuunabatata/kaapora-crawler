import { Browser } from './modules/classes'

const execute = async () => {
  const browser = await new Browser().getInstance()

  const page = await browser.newPage()

  await page.goto('https://www.paodeacucar.com/', { waitUntil: 'networkidle0' })

  await browser.close()

  return {
    ok: true,
  }
}

execute().then(console.log).catch(console.error)
