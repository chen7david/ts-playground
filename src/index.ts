import { db } from './db'
import { migrateToLatest } from './db/migration'

console.log('hello ts world')

const main = async () => {
  await migrateToLatest()
  //   const users = await db.selectFrom('users').selectAll().execute()
  //   console.log(users)
}

main()
