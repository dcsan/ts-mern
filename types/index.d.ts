// types shared between front and backend

// these are part of devDependecices for each project using a link:
// "@types/app-shared-types": "link:../types",
// so there is no need to explicitly import them

interface IItem {
  cname: string,
  name: string
  calories?: number
}

interface IMeal {
  cname: string,
  name: string
  price: number,
  vegetarian: boolean,
  items: string[]
}

interface AppState {
  email: string
  password: string
  isRequesting: boolean
  isLoggedIn: boolean
  data: IItem[]
  msg: string
  error: string
}

interface IUser {
  email: string
  hash: string
  salt: string
}
