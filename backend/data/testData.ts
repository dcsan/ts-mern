// types are automatically imported from ../../../types
// by the package manager

const items: IItem[] = [

  // english
  {
    cname: "sausages",
    name: "Extra Spicy Sausages",
    calories: 150
  },
  {
    cname: "peas",
    name: "Mushy Peas",
    calories: 50
  },
  {
    cname: "eggs",
    name: "Fried Eggs",
    calories: 120
  },

  // japanese
  {
    name: "Sushi",
    cname: "sushi",
    calories: 50
  },
  {
    name: "Miso soup",
    cname: "miso-soup",
    calories: 30
  },

  // chinese
  {
    name: "White rice",
    cname: "white-rice",
    calories: 50
  },
  {
    name: "Delicious Chicken Feet",
    cname: "chicken-feet",
    calories: 500
  },

]

const meals: IMeal[] = [
  {
    name: "English Breakfast",
    cname: "english-breakfast",
    price: 10,
    items: [
      "eggs", "peas", "sausages"
    ],
    vegetarian: false
  },

  {
    name: "Japanese",
    cname: "japanese",
    price: 20,
    items: [
      "sushi", "miso-soup", "white-rice"
    ],
    vegetarian: true
  },

  {
    name: "Chinese",
    cname: "chinese",
    price: 20,
    items: [
      "white-rice", "chicken-feet"
    ],
    vegetarian: false
  }

]

const testData = {
  items,
  meals
}

export default testData
