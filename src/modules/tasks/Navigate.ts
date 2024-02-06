import { WaitEvent, WaitFor } from '../types/tasks'
import { TaskExecutor } from './TaskExecutor'

export class NavigateTask extends TaskExecutor {
  constructor(
    private url: string,
    private waitUntil: WaitFor = 'networkidle0',
    wait?: WaitEvent,
    isNavigation?: boolean,
  ) {
    super(wait, isNavigation)
  }

  public async execute() {
    await this.page.goto(this.url, {
      waitUntil: this.waitUntil,
    })

    return this.executable
  }
}
