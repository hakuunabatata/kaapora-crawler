/* eslint-disable @typescript-eslint/no-explicit-any */
import { Method as AxiosMethod } from 'axios'
import { PuppeteerLifeCycleEvent } from 'puppeteer'

export type FileType = 'html' | 'json' | 'jpeg'

export enum TaskType {
  CLICK = 'CLICK',
  NAVIGATE = 'NAVIGATE',
  SAVE = 'SAVE',
  FETCH = 'FETCH',
}

export type WaitFor = PuppeteerLifeCycleEvent
export type RequestMethod = AxiosMethod
export type RequestHeaders = any
export type RequestBody = any
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

interface FetchTask extends BaseTask {
  type: TaskType.FETCH
  url: string
  method?: RequestMethod
  headers?: RequestHeaders
  body?: RequestBody
  useBrowser?: boolean
  name?: string
}

export type Task = ClickTask | ExportBrowserTask | NavigateTask | FetchTask
