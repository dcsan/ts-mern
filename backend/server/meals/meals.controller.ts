import * as bodyParser from "body-parser"
import * as express from "express"
import { authorize } from "../config"
import Meal from "./meal.model"
import SeedData from "../../scripts/SeedData"
import Logger from "../utils/Logger"
const logger = new Logger("meals.ctrl")

const router = express.Router()

// TODO - refactor into superclass

// TODO - only reload Meals

// http://localhost:60010/api/meals/ext
// example URL with no auth
router.route("/ext").get(async (_, response) => {
  logger.log("/api/meals/ext")
  const items = await Meal.find()
  return response.status(200).json(items)
})

router.route("/reload").get(authorize, async (_, response) => {
  await SeedData.reload({ force: true })
  const items = await Meal.find()
  return response.status(200).json(items)
})

router.route("/").get(authorize, async (_, response) => {
  const items = await Meal.find()
  return response.status(200).json(items)
})

router.route("/").post(authorize, bodyParser.json(), async (request, response) => {
  try {
    const item = new Meal(request.body)
    await item.save()
    return response.status(200).json("meal saved")
  } catch (error) {
    return response.status(400).send(error)
  }
})

export default router
