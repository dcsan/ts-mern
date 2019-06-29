// types shared between front and backend

declare module App {
  interface Item {
    name: string
    calories?: number
  }

  interface Meal {
    name: string
    price: number
  }
}
