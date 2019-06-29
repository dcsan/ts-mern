import * as dotenv from "dotenv"
import * as express from "express"
import * as path from "path"
// import morgan from "morgan"
import morgan = require("morgan")
import fs = require("fs")
import Logger from "./utils/Logger"
const logger = new Logger("app")

import errorHandler = require("errorHandler")


// Put dotenv in use before importing controllers
dotenv.config()

// Import controllers
import itemsController from "./items/items.controller"
import mealsController from "./meals/meals.controller"
import usersController from "./users/users.controller"

// Create the express application
const app = express()
const accessFile = path.join(__dirname, "./logs/access.log") // needs webpack config
const accessLogStream = fs.createWriteStream(accessFile, { flags: "a" })
app.use(morgan("combined", { stream: accessLogStream }))
app.use(morgan('dev', {
  // filter >200 responses
  // skip(req, res) { return false } // return res.statusCode < 150 }
}))

// Assign controllers to routes
app.use("/api/items", itemsController)
app.use("/api/meals", mealsController)
app.use("/api/users", usersController)

// Declare the path to frontend's static assets
const staticPath = path.resolve("..", "frontend", "build")
logger.log('use static', staticPath)
app.use(express.static(staticPath))

// Error Handler. Provides full stack - remove for production
app.use(errorHandler())

// Intercept requests to return the frontend's static entry point
app.get("*", (_, response) => {
  response.sendFile(path.resolve("..", "frontend", "build", "index.html"))
})


export default app
