
import Item from "../server/items/item.model"
import Meal from "../server/meals/meal.model"
import User from "../server/users/user.model"
import Logger from "../server/utils/Logger"
const logger = new Logger("SeedData")

import testData from "../data/testData"

const SeedData = {
  async loadOne(model: any, data: any, name: string) {
    try {
      const items = await model.find({})
      if (items.length !== 0) {
        logger.warn(`Data already initialized for ${ name }, skipping populating script`)
      } else {
        logger.info("No items in the database creating sample data...")
        await model.insertMany(data)
        logger.info(`[${ name }] ${ data.length } item(s) successfuly created!`)
        console.log(data)
      }
    } catch (error) {
      logger.error(error)
    }
  },

  async reload({ force = false }) {
    force = true
    if (force) {
      logger.info("remove test data")
      await Item.remove({})
      await Meal.remove({})
    }
    await SeedData.loadOne(Item, testData.items, "Item")
    await SeedData.loadOne(Meal, testData.meals, "Meal")
    logger.info("reload")
  },

  async addSuperUser() {
    if (!process.env.SUPERUSER || !process.env.SUPERPASS) {
      logger.error("you need a .env file with SUPERUSER and SUPERPASS set to create initial user")
      return
    }
    const users = await User.find({ email: process.env.SUPERUSER })
    if (users.length !== 0) {
      logger.warn("SuperUser existed skipping create")
      return
    }
    const user = new User()
    user.email = process.env.SUPERUSER
    user.setPassword(process.env.SUPERPASS)
    await user.save()
    logger.info("SuperUser successfuly created!")
  },
}

export default SeedData
