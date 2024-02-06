import fs from "fs";
import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: { height: 3840, width: 2160, } })

    const page = await browser.newPage()

    await page.goto('https://www.paodeacucar.com/', { waitUntil: 'networkidle0' })

    const screenshot = await page.screenshot({
        type: 'jpeg',
    })

    fs.writeFileSync('./screenshot.jpeg', screenshot)

    await browser.close()
})()