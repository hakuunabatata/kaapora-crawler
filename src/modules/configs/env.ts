import { z as zod } from 'zod'

const envSchema = zod.object({
  BROWSER_HEADLESS: zod
    .enum(['true', 'false'])
    .default('true')
    .transform((v) => v === 'true'),
  BROWSER_LOCAL: zod
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
  BROWSER_PATH: zod.string().default('google-chrome-stable'),
  BROWSER_REMOTE: zod
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
  BROWSER_HOST: zod.string().optional(),
  BROWSER_PORT: zod.coerce.number().optional(),
  BROWSER_TOKEN: zod.string().optional(),
  BROWSER_VIEWPORT_HEIGHT: zod.coerce.number().default(500),
  BROWSER_VIEWPORT_WIDTH: zod.coerce.number().default(500),
  RESULTS_PATH: zod.string().optional(),
  ALLOWED_RESPONSES: zod
    .string()
    .default('[200,302,301,307]')
    .transform((status) => {
      try {
        return JSON.parse(status) as number[]
      } catch {
        return [] as number[]
      }
    }),
  THROWABLE_RESPONSES: zod
    .string()
    .default('[400,403,500,502]')
    .transform((status) => {
      try {
        return JSON.parse(status) as number[]
      } catch {
        return [] as number[]
      }
    }),
})

export type EnvironmentSchema = zod.infer<typeof envSchema>

export const Environment = envSchema.parse(process.env)
