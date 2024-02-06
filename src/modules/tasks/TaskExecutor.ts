import { Page } from 'puppeteer'
import { Executable } from '../classes/Executable'

export class TaskExecutor {
  page: Page
  executable: Executable

  public async prepare(executable: Executable) {
    this.executable = executable
    this.page = await executable.getPage()

    return this
  }

  public async wait(time: number) {
    return new Promise((resolve) => setTimeout(() => resolve(null), time))
  }
}
