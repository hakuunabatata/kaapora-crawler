import { Browser as BrowserInstance } from 'puppeteer'

import { Environment } from '../configs'
import puppeteerExtra from 'puppeteer-extra'
import { BrowserConfig } from '../types'

const {
  BROWSER_REMOTE,
  BROWSER_HOST,
  BROWSER_PORT,
  BROWSER_TOKEN,
  BROWSER_HEADLESS,
  BROWSER_VIEWPORT_HEIGHT,
  BROWSER_VIEWPORT_WIDTH,
  BROWSER_PATH,
} = Environment

export class Browser {
  private instance: BrowserInstance
  private configs: BrowserConfig

  constructor({
    headless,
    host,
    path,
    port,
    remote,
    token,
    viewportHeight,
    viewportWidth,
  }: Partial<BrowserConfig> = {}) {
    this.configs = {
      headless: headless ?? BROWSER_HEADLESS,
      host: host ?? BROWSER_HOST,
      path: path ?? BROWSER_PATH,
      port: port ?? BROWSER_PORT,
      remote: remote ?? BROWSER_REMOTE,
      token: token ?? BROWSER_TOKEN,
      viewportHeight: viewportHeight ?? BROWSER_VIEWPORT_HEIGHT,
      viewportWidth: viewportWidth ?? BROWSER_VIEWPORT_WIDTH,
    }
  }

  public async getInstance() {
    if (this.configs.remote) this.instance = await this.connect()
    else this.instance = await this.launch()

    return this.instance
  }

  private async launch() {
    const { path, headless, viewportHeight, viewportWidth } = this.configs
    if (!path) throw new Error('missing BROWSER_PATH')
    return puppeteerExtra.launch({
      headless,
      timeout: 0,
      ignoreHTTPSErrors: true,
      defaultViewport: {
        height: viewportHeight,
        width: viewportWidth,
      },
      executablePath: path,
    })
  }

  private async connect() {
    const { host, port, token } = this.configs
    if (!host) throw new Error('Missing BROWSER_HOST')
    if (!port) throw new Error('Missing BROWSER_PORT')
    return puppeteerExtra.connect({
      browserWSEndpoint: `ws://${host}:${port}?token=${token}`,
      ignoreHTTPSErrors: true,
    })
  }
}
