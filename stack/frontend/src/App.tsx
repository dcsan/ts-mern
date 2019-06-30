import axios from "axios"
import React from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { isSessionValid, setSession, clearSession } from "./session"
import Button from "@material-ui/core/Button"
import SideMenu from "./components/SideMenu/SideMenu"

import { AppState } from "../../types/sharedTypes"

import DataView from "./components/DataView/DataView"

import "./App.css"


const Home = () => (
  <div className='block'>
    Home
  </div>
)

const Info = () => (
  <div className='block'>
    Info
  </div>
)

const dataView = () => {
  return(<DataView />)
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

  constructor(props: any) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
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
    // const appBar = this.TopNavBar()
    // const dataView = <DataView />
    const mainApp = <div className="App">
      <Router>
        <SideMenu handleLogout={ this.handleLogout } />
        <Route exact={true} path="/" component={ Home } />
        <Route exact={true} path="/home" component={ Home } />
        <Route exact={true} path="/info" component={ Info } />
        <Route exact={true} path="/data" component={ dataView } />
      </Router>
    </div>
    if (this.state.isLoggedIn) {
      return mainApp
    } else {
      return this.loginBox()
    }
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

  // TODO - handle in child?
  private handleLogout() {
    clearSession()
    this.setState({ isLoggedIn: false })
  }

  // WIP display as table
  // private dataTable() {
  //   this.state.data.map((item: IItem, index) => (
  //     <div key={ index }>
  //       <span className="col col-1">{ item.calories }</span>
  //       <span className="col col-6">{ item.name }</span>
  //     </div>
  //   ))
  // }

}

export default App
