// types shared between front and backend
// have to be explicitly imported

export interface IItem {
  cname: string,
  name: string
  calories?: number
}

export interface IMeal {
  cname: string,
  name: string
  price: number,
  vegetarian: boolean,
  items: string[]
}

export interface AppState {
  email: string
  password: string
  isRequesting: boolean
  isLoggedIn: boolean
  data: IItem[]
  msg: string
  error: string
}

export interface IUser {
  email: string
  hash: string
  salt: string
}

export interface SideMenuProps {
  handleLogout: any
}
