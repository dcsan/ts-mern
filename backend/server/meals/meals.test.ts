import MongodbMemoryServer from "mongodb-memory-server"
import * as mongoose from "mongoose"
import * as request from "supertest"
import app from "../app"
import User from "../users/user.model"
import Meal from "./meal.model"
import Logger from "../utils/Logger"
const logger = new Logger("meals.test")

const authUser = {
  email: "test",
  password: "test"
}

describe("/api/meals tests", () => {
  const mongod = new MongodbMemoryServer()
  let token: string = ""

  // Connect to mongoose mock, create a test user and get the access token
  beforeAll(async () => {
    const uri = await mongod.getConnectionString()
    await mongoose.connect(uri, { useNewUrlParser: true })
    const user = new User()
    user.email = authUser.email
    user.setPassword(authUser.password)
    await user.save()
    const response = await request(app)
      .post("/api/users/login")
      .send(authUser)
    token = response.body.token
    logger.log("login token", token)
  })

  // Remove test user, disconnect and stop database
  afterAll(async () => {
    await User.remove({})
    await mongoose.disconnect()
    await mongod.stop()
  })

  // Create a sample meal
  beforeEach(async () => {
    const meal = new Meal()
    meal.name = "English Breakfast"
    meal.price = 1000
    meal.cname = "english-breakfast"
    await meal.save()
  })

  // Remove sample items
  afterEach(async () => {
    await Meal.remove({})
  })

  it("should get items", async () => {
    const response = await request(app)
      .get("/api/meals")
      .set("Authorization", `Bearer ${ token }`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual([expect.objectContaining({
      price: 1000,
      cname: "english-breakfast"
    })])
  })

  it("should post items", async () => {
    const response = await request(app)
      .post("/api/meals")
      .set("Authorization", `Bearer ${ token }`)
      .send({ name: "new meal", price: 2000, cname: "test-meal" })
    expect(response.status).toBe(200)
    expect(response.body).toBe("Meal saved!")
  })

  it("should catch errors when posting items", async () => {
    const response = await request(app)
      .post("/api/meals")
      .set("Authorization", `Bearer ${ token }`)
      .send({})
    expect(response.status).toBe(400)
  })
})
