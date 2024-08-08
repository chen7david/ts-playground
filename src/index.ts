import db from './db'
import { UserEntity } from './user.model'

// const columns = Object.keys(UserEntity.shap)

const obj = {
  xid: '795012b3-b185-47ff-8590-dddddbd47b7386acd',
  imageUrl:
    'https://res.cloudinary.com/dbhdod0gm/image/upload/v1721408659/t8vvdztckrvjlkkp3jmp.jpg',
  username: 'chen7david21',
  email: 'chen7david@me.com',
  password: 'password',
  activated_at: null,
  timezone: null,
  theme: 'light',
  deletedAt: '2024-08-08T02:13:10.352Z',
}

async function main() {
  // Example query to fetch users
  const users = await db
    .selectFrom('users')
    // .select(['id', 'username', 'email', 'image_url'])
    .selectAll()
    // .where('id', '=', 10)
    // .executeTakeFirst()
    .execute()

  //   const newUser = await db.insertInto('users').values({
  //   xid: '795012b3-b185-47ff-8590-dddddbd47b7386acd',
  //   imageUrl:
  //     'https://res.cloudinary.com/dbhdod0gm/image/upload/v1721408659/t8vvdztckrvjlkkp3jmp.jpg',
  //   username: 'chen7david21',
  //   email: 'chen7david@me.com',
  //   password: 'password',
  //   activated_at: null,
  //   timezone: null,
  //   theme: 'light',
  //   deletedAt: '2024-08-08T02:13:10.352Z',
  // }).executeTakeFirst()
  console.log({ users })
}

main().catch(console.error)
