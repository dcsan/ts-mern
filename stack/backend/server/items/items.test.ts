import MongodbMemoryServer from "mongodb-memory-server"
import * as mongoose from "mongoose"
import * as request from "supertest"
import app from "../app"
import User from "../users/user.model"
import Item from "./item.model"
import Logger from "../utils/Logger"
const logger = new Logger("items.test")

const authUser = {
  email: "test",
  password: "test"
}

describe("/api/items tests", () => {
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
    // logger.log("login token", token)
  })

  // Remove test user, disconnect and stop database
  afterAll(async () => {
    await User.remove({})
    await mongoose.disconnect()
    await mongod.stop()
  })

  // Create a sample item
  beforeEach(async () => {
    const item = new Item()
    item.name = "item name"
    item.cname = "test-item"
    item.calories = 1000
    await item.save()
  })

  // Remove sample items
  afterEach(async () => {
    await Item.remove({})
  })

  it("should get items", async () => {
    const response = await request(app)
      .get("/api/items")
      .set("Authorization", `Bearer ${ token }`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual([expect.objectContaining({
      name: "item name",
      calories: 1000,
      cname: "test-item"
    })])
  })

  it("should post items", async () => {
    const response = await request(app)
      .post("/api/items")
      .set("Authorization", `Bearer ${ token }`)
      .send({ name: "new item", calories: 2000, cname: "test-item" })
    expect(response.status).toBe(200)
    expect(response.body).toBe("Item saved!")
  })

  it("should catch errors when posting items", async () => {
    const response = await request(app)
      .post("/api/items")
      .set("Authorization", `Bearer ${ token }`)
      .send({})
    expect(response.status).toBe(400)
  })
})
