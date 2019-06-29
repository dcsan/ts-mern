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
  name: string
  cname: string,
  calories?: number
}

export interface IMeal {
  name: string
  price: number
}
