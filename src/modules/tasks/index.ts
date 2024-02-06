import { Task, TaskType } from '../types/tasks'
import { ClickTask } from './Click'
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
    default:
      throw new Error('Invalid Type')
  }
}
