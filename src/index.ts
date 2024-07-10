function dynamicPick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

interface IUserEntity {
  id: number
  name: string
  email: string
  age: number
}

const user: IUserEntity = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 30,
}

const userKeys = {
  id: 1,
  age: 30,
}

const compileTimeKeys = Object.keys(userKeys)

const pickedUser = dynamicPick(user, ['name', 'email', 'age'])
console.log(pickedUser) // Output: { name: 'John Doe', email: 'john.doe@example.com' }
