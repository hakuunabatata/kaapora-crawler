import { Page } from 'puppeteer'
import { Executable } from '../classes/Executable'
import { WaitEvent } from '../types/tasks'

export abstract class TaskExecutor {
  #page?: Page
  #executable?: Executable

  constructor(
    private wait?: WaitEvent,
    private isNavigation?: boolean,
    private useBrowser = true,
  ) {}

  abstract execute(): Promise<Executable>

  public get page() {
    if (!this.#page) throw new Error('Page not found')
    return this.#page
  }

  public get executable() {
    if (!this.#executable) throw new Error('No Executable found')
    return this.#executable
  }

  public async prepare(executable: Executable) {
    this.#executable = executable
    if (this.useBrowser) this.#page = await executable.getPage()

    return this
  }

  public async _execute() {
    const executable = await this.execute()
    if (this.wait) await this.waitFor(this.wait)
    if (this.useBrowser && this.isNavigation)
      await this.page.waitForNavigation({
        waitUntil:
          this.wait && typeof this.wait !== 'number'
            ? this.wait
            : this.executable.waitUntil,
      })
    return executable
  }

  public async waitFor(waitUntil: WaitEvent) {
    if (typeof waitUntil === 'number')
      return new Promise((resolve) =>
        setTimeout(() => resolve(null), waitUntil),
      )

    return this.page.waitForNavigation({ waitUntil })
  }
}
