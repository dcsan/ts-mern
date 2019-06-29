// // types shared between front and backend
// deprecated

// declare module App {
//   interface Item {
//     name: string
//     calories?: number
//   }

//   interface Meal {
//     name: string
//     price: number
//   }
// }


export interface IItem {
  cname: string,
  name: string
  calories?: number
}

export interface IMeal {
  cname: string,
  name: string
  price: number,
  items: string[]
}
