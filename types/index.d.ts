// // types shared between front and backend
// deprecated

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
