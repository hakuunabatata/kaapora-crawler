import { Page } from 'puppeteer'
import { Executable } from '../classes/Executable'
import { WaitEvent } from '../types/tasks'

export abstract class TaskExecutor {
  page: Page
  executable: Executable

  constructor(
    private wait?: WaitEvent,
    private isNavigation?: boolean,
  ) {}

  abstract execute(): Promise<Executable>

  public async prepare(executable: Executable) {
    this.executable = executable
    this.page = await executable.getPage()

    return this
  }

  public async _execute() {
    console.log(this.constructor.name)

    const executable = await this.execute()
    if (this.wait) await this.waitFor(this.wait)
    if (this.isNavigation)
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
