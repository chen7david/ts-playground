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
    .leftJoin('emails', 'users.id', 'emails.user_id')
    .leftJoin('native_names', 'users.id', 'native_names.user_id')
    .leftJoin('conobjs', 'users.id', 'conobjs.user_id')
    .leftJoin('phone_numbers', 'users.id', 'phone_numbers.user_id')
    .select(
      'users.first_name',
      'users.last_name',
      'users.date_of_birth',
      'users.country_of_birth',
      'users.place_of_birth',
      'native_names.native_name',
      'users.gender',
      'emails.email',
      'conobjs.text as wechatid',
      'phone_numbers.phone_number as phone',
    )
  const seedUsers = users.map((user) => ({
    ...user,
    sex: user.gender === 'm' ? 'male' : 'female',
    username: `${user.first_name.trim() + user.last_name.trim()}`.toLowerCase(),
    password: '88888888',
    profile_image_url: '',
    email: user.email === '' ? 'chen7david@me.com' : user.email,
    native_name: user.native_name === null ? '' : user.native_name,
    wechatid: user.wechatid === null ? '' : user.wechatid,
    first_name: user.first_name.trim(),
    last_name: user.last_name === '' ? 'XXX' : user.last_name.trim(),
  }))

  for (let user of seedUsers) {
    try {
      const { data } = await http.post('/api/v1/users', user, {
        headers: { Authorization: token },
      })
      console.log(data)
    } catch (error: any) {
      console.log(error.response.data)
      console.log(error.response.data.details)
    }
  }
  console.table(seedUsers)
}

main()
