import chalk from 'chalk'
import Item from '../server/items/item.model'
import User from '../server/users/user.model'
import Logger from '../server/utils/Logger'
const logger = new Logger('SeedData')

import testData from '../data/testData'

const SeedData = {
  async reload({ force = false }) {
    if (force) {
      logger.info('remove test data')
      await Item.remove({})
    }
    logger.info('reload')
    try {
      const items = await Item.find({})
      if (items.length !== 0) {
        logger.warn('Database already initiated, skipping populating script')
      } else {
        logger.info('No items in the database creating sample data...')
        await Item.insertMany(testData.items)
        logger.info(`${testData.items.length} item(s) successfuly created!`)
      }
    } catch (error) {
      logger.error(error)
    }
  },

  async addSuperUser() {
    if (!process.env.SUPERUSER || !process.env.SUPERPASS) {
      logger.error('you need a .env file with SUPERUSER and SUPERPASS set to create initial user')
      return
    }
    const users = await User.find({ email: process.env.SUPERUSER })
    if (users.length !== 0) {
      logger.warn('SuperUser existed skipping create')
      return
    }
    const user = new User()
    user.email = process.env.SUPERUSER
    user.setPassword(process.env.SUPERPASS)
    await user.save()
    logger.info('SuperUser successfuly created!')
  },
}

export default SeedData
