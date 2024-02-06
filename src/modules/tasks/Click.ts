import { WaitEvent } from '../types/tasks'
import { TaskExecutor } from './TaskExecutor'

export class ClickTask extends TaskExecutor {
  constructor(
    private selector: string,
    wait?: WaitEvent,
    isNavigation?: boolean,
  ) {
    super(wait, isNavigation)
  }

  public async execute() {
    await this.page.evaluate((selector) => {
      const element = document.querySelector<HTMLElement>(selector)

      if (!element) return

      element.click()
    }, this.selector)

    return this.executable
  }
}
