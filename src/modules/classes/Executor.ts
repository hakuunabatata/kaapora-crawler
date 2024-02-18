import { getExecutor } from '../tasks'
import { Task } from '../types/tasks'
import { Executable } from './Executable'
import { Repository } from './Repository'

export class Executor {
  private executable: Executable

  constructor(
    private tasks: Task[],
    private exportFiles = false,
    private repository?: Repository,
  ) {
    this.executable = new Executable()
  }

  async execute() {
    for (const task of this.tasks) {
      const executor = await getExecutor(task).prepare(this.executable)
      await executor._execute()
    }

    if (this.exportFiles) await this.export()

    return this.executable.closeBrowser()
  }

  private async export() {
    for (const [key, content] of Object.entries(this.executable.results)) {
      if (this.repository) await this.repository.write(content, key)
    }
  }
}
