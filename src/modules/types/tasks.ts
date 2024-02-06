import { PuppeteerLifeCycleEvent } from 'puppeteer'

export enum TaskType {
  CLICK = 'CLICK',
  NAVIGATE = 'NAVIGATE',
  SAVE = 'SAVE',
}

export type WaitFor = PuppeteerLifeCycleEvent
export type WaitEvent = WaitFor | number

interface BaseTask {
  type: TaskType
  wait?: WaitFor | number
  isNavigation?: boolean
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

interface NavigateTask extends BaseTask {
  type: TaskType.NAVIGATE
  url: string
  waitUntil?: WaitFor
}

export type Task = ClickTask | ExportBrowserTask | NavigateTask
