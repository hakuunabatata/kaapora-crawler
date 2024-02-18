import { Page } from 'puppeteer'
import { FileType, WaitFor } from '../types/tasks'
import { Browser } from './Browser'

export class Executable {
  #page?: Page
  #browser?: Browser
  index = 0
  waitUntil?: WaitFor
  results: Record<string, Buffer> = {}
  errors: string[] = []
  warnings: string[] = []

  public getPage = async () => {
    if (!this.#browser) this.#browser = new Browser()
    if (!this.#page) this.#page = await this.#browser.getPage()
    return this.#page
  }

  public addResult = (
    type: FileType,
    key: string,
    content: string | Buffer | unknown,
  ) => {
    this.results = {
      ...this.results,
      [`${key}-${this.index}.${type}`]: Buffer.isBuffer(content)
        ? content
        : Buffer.from(
            typeof content === 'string' ? content : JSON.stringify(content),
          ),
    }

    return this.results
  }

  public closeBrowser = async () => {
    if (this.#browser) await this.#browser.close()
    this.#page = undefined
    this.#browser = undefined
    return this
  }

  public addError(error: string, throwable?: boolean) {
    this[throwable ? 'errors' : 'warnings'].push(error)
  }
}
