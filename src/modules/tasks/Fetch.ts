import axios from 'axios'
import {
  FileType,
  RequestBody,
  RequestHeaders,
  RequestMethod,
  WaitEvent,
} from '../types/tasks'
import { TaskExecutor } from './TaskExecutor'

export class FetchTask extends TaskExecutor {
  constructor(
    private url: string,
    private method: RequestMethod = 'GET',
    private headers?: RequestHeaders,
    private body?: RequestBody,
    private name = 'response',
    wait?: WaitEvent,
    useBrowser = false,
  ) {
    super(wait, false, useBrowser)
  }

  public async execute() {
    let response: {
      data: string
      extension: FileType
      statusCode: number
      statusText: string
    }

    const getExtension = (contentType?: string): FileType =>
      contentType?.match(/html/) ? 'html' : 'json'

    if (this.useBrowser) {
      response = await this.page.evaluate(
        (
          url: string,
          headers?: RequestHeaders,
          body?: RequestBody,
          method?: RequestMethod,
        ) =>
          fetch(url, { method, headers, body }).then(async (res) => ({
            data: await res.text(),
            extension: getExtension(`${res.headers.get('Content-Type')}`),
            statusCode: res.status,
            statusText: res.statusText,
          })),
        this.url,
        this.headers,
        this.body,
        this.method,
      )
    } else {
      response = await axios({
        url: this.url,
        headers: this.headers,
        data: this.body,
        method: this.method,
      }).then((res) => ({
        data: res.data,
        extension: getExtension(res.headers['content-type']),
        statusCode: res.status,
        statusText: res.statusText,
      }))
    }

    if (response) {
      if (this.validateStatus(response.statusCode))
        this.executable.addResult(response.extension, this.name, response)
    }

    return this.executable
  }
}
