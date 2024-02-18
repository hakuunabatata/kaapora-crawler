import { mkdir, readFile, writeFile } from 'node:fs'
import { promisify } from 'node:util'
import { Executor } from './modules/classes/Executor'
import { Repository } from './modules/classes/Repository'
import { Environment } from './modules/configs'
import { Task, TaskType } from './modules/types/tasks'

const { RESULTS_PATH = './' } = Environment

class LocalRepository implements Repository {
  #write = promisify(writeFile)
  #read = promisify(readFile)
  #mkdir = promisify(mkdir)

  constructor(private baseFolder: string = RESULTS_PATH) {}

  async write(file: Buffer, path: string): Promise<void> {
    return this.#mkdir(this.baseFolder, { recursive: true }).then(async () =>
      this.#write([this.baseFolder, path].join('/'), file),
    )
  }

  async read<T>(path: string, isJson = false): Promise<T> {
    return this.#read([this.baseFolder, path].join('/')).then(
      (file) => (isJson ? file : JSON.parse(file.toString())) as T,
    )
  }
}

const execute = async () => {
  const tasks: Task[] = [
    {
      type: TaskType.NAVIGATE,
      url: 'https://www.paodeacucar.com/',
    },
    {
      type: TaskType.SAVE,
      file: 'result',
    },
  ]

  const executor = new Executor(tasks, true, new LocalRepository())

  const result = await executor.execute()

  return result
}

execute()
