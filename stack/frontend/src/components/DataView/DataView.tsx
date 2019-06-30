import React from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import axios from "axios"
import { getAuthHeaders } from "../../session"

import { IItem } from "../../../../types/sharedTypes"

class DataView extends React.Component<{}, {}> {

  public state = {
    left: false,
    data: {msg: "ready"}
  }

  public render() {
    const spacing = 2
    const jsonData = JSON.stringify(this.state.data, null, 2)
    // const jsonData = "some data"

    return (

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
                // disabled={ this.state.isRequesting }
                color="secondary"
                onClick={ this.reloadTestData }
              >
                reload
              </Button>

              <Button
                id="fetchDataButton"
                className="side-button"
                // disabled={ this.state.isRequesting }
                variant="outlined"
                color="primary"
                onClick={ this.getItems }
              >
                api/items
              </Button>

              <Button
                id="fetchDataButton"
                className="side-button"
                // disabled={ this.state.isRequesting }
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
    )
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

  private getMeals = async (): Promise<void> => {
    this.testApi("Meals", "/api/meals")
  }

  private getItems = async (): Promise<void> => {
    this.testApi("Items", "/api/items")
  }


}

export default DataView
