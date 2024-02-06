export interface BrowserConfig {
  remote: boolean
  path: string
  headless: boolean
  viewportWidth: number
  viewportHeight: number
  host?: string
  port?: number
  token?: string
}
