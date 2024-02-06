import { TaskExecutor } from './TaskExecutor'

export class ClickTask extends TaskExecutor {
  public async execute(selector: string, time: number) {
    await this.page.evaluate((selector) => {
      const element = document.querySelector<HTMLElement>(selector)

      if (!element) return

      element.click()
    }, selector)

    if (time) await this.wait(time)
  }
}
