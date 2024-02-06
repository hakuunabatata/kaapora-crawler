import { Executor } from './modules/classes/Executor'
import { Task, TaskType } from './modules/types/tasks'

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

  const executor = new Executor(tasks)

  await executor.execute()
}

execute().then(console.log).catch(console.error)
