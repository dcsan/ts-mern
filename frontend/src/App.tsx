import axios from "axios"
import React from "react"
import "./App.css"
import { isSessionValid, setSession, clearSession, getAuthHeaders } from "./session"
import Button from "@material-ui/core/Button"
// import App from "../../types/index"
import { IItem } from "../../types/AppTypes"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

export interface AppState {
  email: string
  password: string
  isRequesting: boolean
  isLoggedIn: boolean
  data: IItem[]
  error: string
}

class App extends React.Component<{}, AppState> {
  public state = {
    email: "",
    password: "",
    isRequesting: false,
    isLoggedIn: false,
    data: [],
    error: "",
  }

  public componentDidMount() {
    this.setState({ isLoggedIn: isSessionValid() })
  }

  public loginBox() {
    return (
      <div className="App-login">
        (try the credentials: test/test)
        <input
          disabled={this.state.isRequesting}
          placeholder="email"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}
        />
        <input
          disabled={this.state.isRequesting}
          placeholder="password"
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}
        />
        <Button id="loginButton" disabled={this.state.isRequesting} variant="contained" color="primary" onClick={this.handleLogin}>
          Login
        </Button>
      </div>
    )
  }

  public render() {
    const appBar = this.ButtonAppBar()
    return (

      <div className="App">
        { appBar }
        <header className="App-header">
          <h1 className="App-title">Welcome to TS-Mern app</h1>
        </header>
        <div className="App-error">{this.state.error}</div>
        {this.state.isLoggedIn ? (
          <div className="App-private">
            <div className="item-list">
              Server seed data:
              {this.state.data.map((item: IItem, index) => (
                <div key={index}>
                  name: {item.name} / value: {item.value}
                </div>
              ))}
            </div>

            <Button
              id="reloadButton"
              disabled={this.state.isRequesting}
              variant="contained"
              color="secondary"
              onClick={this.reloadTestData}
            >
              reloadTestData
            </Button>

            <Button
              id="fetchDataButton"
              disabled={this.state.isRequesting}
              variant="contained"
              color="primary"
              onClick={this.fetchTestData}
            >
              fetch test data
            </Button>

            <Button id="logoutButton" disabled={this.state.isRequesting} variant="contained" color="primary" onClick={this.logout}>
              Logout
            </Button>
          </div>
        ) : (
          this.loginBox()
        )}
      </div>
    )
  }

  private handleLogin = async (): Promise<void> => {
    const { email, password } = this.state
    try {
      this.setState({ error: "" })
      this.setState({ isRequesting: true })
      const response = await axios.post<{ token: string; expiry: string }>("/api/users/login", { email, password })
      const { token, expiry } = response.data
      setSession(token, expiry)
      this.setState({ isLoggedIn: true })
    } catch (error) {
      this.setState({ error: "Something went wrong" })
    } finally {
      this.setState({ isRequesting: false })
    }
  }

  private logout = (): void => {
    clearSession()
    this.setState({ isLoggedIn: false })
  }

  private fetchTestData = async (): Promise<void> => {
    try {
      this.setState({ error: "" })
      const response = await axios.get<IItem[]>("/api/items", { headers: getAuthHeaders() })
      console.log("fetched=>", response.data)
      this.setState({ data: response.data })
    } catch (error) {
      this.setState({ error: "Something went wrong" })
    } finally {
      this.setState({ isRequesting: false })
    }
  }

  private reloadTestData = async (): Promise<void> => {
    try {
      this.setState({ error: "" })
      const response = await axios.get<IItem[]>("/api/items/reload", { headers: getAuthHeaders() })
      this.setState({ data: response.data })
    } catch (error) {
      this.setState({ error: "Something went wrong" })
    } finally {
      this.setState({ isRequesting: false })
    }
  }

  private ButtonAppBar() {

    return (
      <div className="root">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className="menu-button" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="title">
              TS-MERN
            </Typography>
            <Button color="inherit">stuff</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }

}

export default App
