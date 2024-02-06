export enum TaskType {
  CLICK = 'CLICK',
  NAVIGATE = 'NAVIGATE',
  SAVE = 'SAVE',
}

interface BaseTask {
  type: TaskType
  wait?: number
}

interface ElementTask extends BaseTask {
  selector: string
}

interface ExportTask extends BaseTask {
  file?: string
}

interface ClickTask extends ElementTask {
  type: TaskType.CLICK
}

interface ExportBrowserTask extends ExportTask {
  type: TaskType.SAVE
}

export type Task = ClickTask | ExportBrowserTask
