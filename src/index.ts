import axios from 'axios'
import { db } from './knex/knex.client'

const http = axios.create({
  // baseURL: 'https://api.entix.me',
  baseURL: 'http://localhost:3000',
})

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJVMjQwNzEwOTAwOTIzNzU1IiwicmVmcmVzaCI6ZmFsc2UsImlhdCI6MTcyMjE2NTE1OCwiZXhwIjoxNzIyMTY4NzU4fQ.b1sMa50G0C-U574pzKTksfehXdGhvVCB3-R3M2clzI0'

const main = async () => {
  const users = await db('users')
    .join('emails', 'users.id', 'emails.user_id')
    .select(
      'users.first_name',
      'users.last_name',
      'users.date_of_birth',
      'users.gender',
      'emails.email',
    )
  const seedUsers = users.map((user) => ({
    ...user,
    sex: user.gender === 'm' ? 'male' : 'female',
    username: `${user.first_name.trim() + user.last_name.trim()}`.toLowerCase(),
    password: '88888888',
    profile_image_url: '',
    first_name: user.first_name.trim(),
    email: user.email === '' ? 'chen7david@me.com' : user.email,
    last_name: user.last_name === '' ? 'XXX' : user.last_name.trim(),
  }))

  // for (let user of seedUsers) {
  //   try {
  //     const { data } = await http.post('/api/v1/users', user, {
  //       headers: { Authorization: token },
  //     })
  //     console.log(data)
  //   } catch (error: any) {
  //     console.log(error.response.data)
  //   }
  // }
  console.table(seedUsers)
}

main()
