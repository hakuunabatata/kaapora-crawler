import { Executable } from '../classes/Executable'
import { WaitEvent } from '../types/tasks'
import { TaskExecutor } from './TaskExecutor'

export class SaveTask extends TaskExecutor {
  constructor(
    private file: string = 'index',
    isNavigation = false,
    wait?: WaitEvent,
  ) {
    super(wait, isNavigation)
  }

  public async execute(): Promise<Executable> {
    const content = await this.page.content()

    const screenshot = await this.page.screenshot()

    this.executable.addResult('jpeg', 'screenshot', screenshot)
    this.executable.addResult('html', this.file, content)

    return this.executable
  }
}
