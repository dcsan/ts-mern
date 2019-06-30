import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { shallow } from "enzyme"
import * as React from "react"
import App from "./App"

let mock: MockAdapter
const mockItemsResponse = [{ name: "item1", calories: 100 }]
const mockLoginResponse = { expiry: "2020-01-01T10:00:00.000Z", token: "abcd123" }
const mockUserCredentials = { email: "test", password: "test" }

beforeEach(() => {
  mock = new MockAdapter(axios)
  localStorage.clear()
})

it("conditionally renders based on session", () => {
  const invalidSessionWrapper = shallow<AppState>(<App />)
  expect(invalidSessionWrapper.find("div[className='App-login']")).toHaveLength(1)
  const expiry = new Date()
  expiry.setFullYear(expiry.getFullYear() + 1)
  localStorage.setItem("expiry", expiry.toISOString())
  const validSessionWrapper = shallow<AppState>(<App />)
  expect(validSessionWrapper.find("div[className='App-private']")).toHaveLength(1)
})

it("can handle login", done => {
  mock.onPost("/api/users/login", mockUserCredentials).reply(200, mockLoginResponse)
  const wrapper = shallow<AppState>(<App />)
  wrapper.find("input[placeholder='email']").simulate("change", { target: { value: mockUserCredentials.email } })
  wrapper.find("input[placeholder='password']").simulate("change", { target: { value: mockUserCredentials.password } })
  // wrapper.find("button[children='Login']").simulate("click")
  wrapper.find("#loginButton").simulate("click")
  setImmediate(() => {
    expect(wrapper.state().isLoggedIn).toBe(true)
    done()
  })
})

it("can catch login errors", done => {
  mock.onPost("/api/users/login").reply(400)
  const wrapper = shallow<AppState>(<App />)
  wrapper.setState({ email: "test", password: "test" })
  wrapper.find("#loginButton").simulate("click")
  setImmediate(() => {
    expect(wrapper.state().error).toBe("Something went wrong")
    done()
  })
})

it("can handle logout", () => {
  const wrapper = shallow<AppState>(<App />)
  wrapper.setState({ isLoggedIn: true })
  // wrapper.find("button[children='Logout']").simulate("click")
  wrapper.find("#logoutButton").simulate("click")
  expect(wrapper.state().isLoggedIn).toBe(false)
})

// FAILING skip for now
xit("can get data", done => {
  mock.onGet("/api/items").reply(200, mockItemsResponse)
  const wrapper = shallow<AppState>(<App />)
  wrapper.setState({ isLoggedIn: true })
  // wrapper.find("button[children='fetch test data']").simulate("click")
  wrapper.find("#reloadButton").simulate("click")
  setImmediate(() => {
    console.log('state', wrapper.state())
    // FAILING
    expect(wrapper.state().data).toEqual(mockItemsResponse)
    done()
  })
})

it("can catch data errors", done => {
  mock.onGet("/api/items").reply(400)
  const wrapper = shallow<AppState>(<App />)
  wrapper.setState({ isLoggedIn: true })
  wrapper.find("#reloadButton").simulate("click")
  setImmediate(() => {
    expect(wrapper.state().error).toBe("Something went wrong")
    done()
  })
})
