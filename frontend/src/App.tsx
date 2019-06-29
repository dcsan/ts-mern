import axios from "axios"
import React from "react"
import "./App.css"
import { isSessionValid, setSession, clearSession, getAuthHeaders } from "./session"
import Button from "@material-ui/core/Button"
import { IItem } from "../../types"
// import { App } from "../../types"
import Grid from "@material-ui/core/Grid"
// import Paper from "@material-ui/core/Paper"

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
  msg: string
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
    msg: "ready"
  }

  public componentDidMount() {
    this.setState({ isLoggedIn: isSessionValid() })
  }

  public loginBox() {
    return (
      <div className="App-login">
        (try the credentials: test/test)
        <input
          disabled={ this.state.isRequesting }
          placeholder="email"
          type="text"
          onChange={ (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value }) }
        />
        <input
          disabled={ this.state.isRequesting }
          placeholder="password"
          type="password"
          onChange={ (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value }) }
        />
        <Button id="loginButton" disabled={ this.state.isRequesting } variant="contained" color="primary" onClick={ this.handleLogin }>
          Login
        </Button>
      </div>
    )
  }

  public render() {
    const appBar = this.TopNavBar()
    const spacing = 2
    const jsonData = JSON.stringify(this.state.data, null, 2)
    return (

      <div className="App">
        { appBar }
        <div className="App-header">
          <h1 className="App-title">{ this.state.msg }</h1>
        </div>
        <div className="App-error">{ this.state.error }</div>

        { this.state.isLoggedIn ? (
          <div className="App-private">
            <Grid
              container={ true }
              className="root"
              spacing={ spacing }
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid
                item={ true }
                xs={ 3 }
              >
                <div className="left-bar">

                  <Button
                    size="small"
                    className="side-button"
                    variant="outlined"
                    id="reloadButton"
                    disabled={ this.state.isRequesting }
                    color="secondary"
                    onClick={ this.reloadTestData }
                  >
                    reload
                </Button>

                  <Button
                    id="fetchDataButton"
                    className="side-button"
                    disabled={ this.state.isRequesting }
                    variant="outlined"
                    color="primary"
                    onClick={ this.fetchTestData }
                  >
                    fetch
                </Button>

                  <Button
                    id="fetchDataButton"
                    className="side-button"
                    disabled={ this.state.isRequesting }
                    variant="outlined"
                    color="primary"
                    onClick={ this.getItems }
                  >
                    api/items
                </Button>

                  <Button
                    id="fetchDataButton"
                    className="side-button"
                    disabled={ this.state.isRequesting }
                    variant="outlined"
                    color="primary"
                    onClick={ this.getMeals }
                  >
                    api/meals
                </Button>

                </div>

              </Grid>

              {/* output */ }
              <Grid item={ true } xs={ 9 }>
                <div className="code">
                  { jsonData }
                </div>
              </Grid>
            </Grid>


          </div>
        ) : (
            this.loginBox()
          ) }
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
      this.setState({ data: response.data })
      console.log("fetched=>", response.data)
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
      console.log("fetched=>", response.data)
    } catch (error) {
      this.setState({ error: "Something went wrong" })
    } finally {
      this.setState({ isRequesting: false })
    }
  }

  private getMeals = async (): Promise<void> => {
    this.testApi("Meals", "/api/meals")
  }

  private getItems = async (): Promise<void> => {
    this.testApi("Items", "/api/items")
  }

  private testApi = async (name: string, uri: string): Promise<void> => {
    try {
      this.setState({ error: "" })
      const response = await axios.get<IItem[]>(uri, { headers: getAuthHeaders() })
      this.setState({
        msg: name,
        data: response.data
      })
      console.log("fetched=>", response.data)
    } catch (error) {
      this.setState({ error: "Something went wrong" })
    } finally {
      this.setState({ isRequesting: false })
    }

  }

  private TopNavBar() {

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
            <Button
              id="logoutButton"
              className="side-button"
              disabled={ this.state.isRequesting }
              variant="contained"
              color="secondary"
              onClick={ this.logout }>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }

  // WIP display as table
  private dataTable() {
    {
      /*
      { this.state.data.map((item: IItem, index) => (
        <div key={ index }>
        <span className="col col-1">{ item.calories }</span>
        <span className="col col-6">{ item.name }</span>
        </div>
      */
    }
  }

}

export default App
