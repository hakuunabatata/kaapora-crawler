import { Task, TaskType } from '../types/tasks'
import { ClickTask } from './Click'
import { FetchTask } from './Fetch'
import { NavigateTask } from './Navigate'
import { SaveTask } from './Save'

export const getExecutor = (task: Task) => {
  switch (task.type) {
    case TaskType.CLICK:
      return new ClickTask(task.selector, task.wait, task.isNavigation)
    case TaskType.SAVE:
      return new SaveTask(task.file, task.isNavigation, task.wait)
    case TaskType.NAVIGATE:
      return new NavigateTask(
        task.url,
        task.waitUntil,
        task.wait,
        task.isNavigation,
      )
    case TaskType.FETCH:
      return new FetchTask(
        task.url,
        task.method,
        task.headers,
        task.body,
        task.wait,
        task.useBrowser,
      )
    default:
      throw new Error('Invalid Type')
  }
}
