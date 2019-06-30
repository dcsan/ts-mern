import * as bodyParser from "body-parser"
import * as express from "express"
import { authorize } from "../config"
import Item from "./item.model"
import Meal from "../meals/meal.model"
import SeedData from "../../scripts/SeedData"

const router = express.Router()

router.route("/reload").get(authorize, async (_, response) => {
  await SeedData.reload({ force: true })
  const items = await Item.find()
  const meals = await Meal.find()
  const data = {
    items: items.length,
    meals: meals.length
  }
  return response.status(200).json({ data })
})

router.route("/").get(authorize, async (_, response) => {
  const items = await Item.find()
  return response.status(200).json(items)
})

router.route("/").post(authorize, bodyParser.json(), async (request, response) => {
  try {
    const item = new Item(request.body)
    await item.save()
    return response.status(200).json("Item saved!")
  } catch (error) {
    return response.status(400).send(error)
  }
})

export default router
