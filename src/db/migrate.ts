import postgres from 'postgres'

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import { env } from '@/env'
;(async () => {
  const connection = postgres(env.DATABASE_URL, { max: 1 })
  const db = drizzle(connection)

  await migrate(db, { migrationsFolder: 'drizzle' })

  await connection.end()

  process.exit()
})().catch((error) => {
  console.error(error)
  process.exit(1)
})