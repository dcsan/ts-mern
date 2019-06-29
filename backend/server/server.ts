import * as mongoose from 'mongoose'
import SeedData from '../scripts/SeedData'
import app from './app'
import Logger from '../server/utils/Logger'
const logger = new Logger('server')

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_database'
const port = process.env.PORT || 9000
;(async () => {
  // Connect to the database
  await mongoose.connect(mongoUri, { useNewUrlParser: true })
  logger.info('connected to ', mongoUri)

  // Populate database with sample data if it's empty
  await SeedData.reload({ force: false })
  await SeedData.addSuperUser()
  // Start express App
  app.listen(port)
  console.log(`server listening on port: ${port}`)
})()
