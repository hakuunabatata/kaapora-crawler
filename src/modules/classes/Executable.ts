import { Page } from 'puppeteer'
import { Browser } from './Browser'

export class Executable {
  #page?: Page
  #browser?: Browser

  public getPage = async () => {
    if (!this.#browser) this.#browser = new Browser()
    if (!this.#page) this.#page = await this.#browser.getPage()
    return this.#page
  }
}
