import { Page } from 'puppeteer'
import { WaitFor } from '../types/tasks'
import { Browser } from './Browser'

export class Executable {
  #page?: Page
  #browser?: Browser
  waitUntil: WaitFor
  results: Record<'html' | 'json', Record<string, Buffer[]>> = {
    html: {},
    json: {},
  }

  public getPage = async () => {
    if (!this.#browser) this.#browser = new Browser()
    if (!this.#page) this.#page = await this.#browser.getPage()
    return this.#page
  }

  public addResult = (type: 'html' | 'json', key: string, content: string) => {
    const prevInfo = this.results[type] ?? {}
    this.results[type] = {
      ...prevInfo,
      [key]: [...prevInfo[key], Buffer.from(content, 'base64')],
    }
    return this
  }
}
