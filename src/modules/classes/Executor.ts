import { getExecutor } from '../tasks'
import { Task } from '../types/tasks'
import { Executable } from './Executable'

export class Executor {
  #executable: Executable

  constructor(private tasks: Task[]) {
    this.#executable = new Executable()
  }

  async execute() {
    for (const task of this.tasks) {
      const executor = await getExecutor(task).prepare(this.#executable)
      await executor._execute()
    }
  }
}
