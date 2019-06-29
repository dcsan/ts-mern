const testData = {
  items: [

    // english
    {
      cname: "sausages",
      name: "Spicy Sausages",
    },
    {
      cname: "peas",
      name: "Mushy Peas"
    },
    {
      cname: "eggs",
      name: "Fried Eggs"
    },

    // japanese
    {
      name: "Sushi",
      cname: "sushi"
    },
    {
      name: "Miso soup",
      cname: "miso-soup"
    },

    // chinese
    {
      name: "White rice",
      cname: "white-rice"
    },
    {
      name: "Delicious Chicken Feet",
      cname: "chicken-feet"
    },

  ],

  meals: [
    {
      name: "English",
      price: 10,
      items: [
        "eggs", "peas", "sausages"
      ]
    },

    {
      name: "Japanese",
      price: 20,
      items: [
        "sushi", "miso-soup", "white-rice"
      ]
    },

    {
      name: "Chinese",
      price: 20,
      items: [
        "white-rice", "chicken-feet"
      ]
    },

  ],

}

export default testData
