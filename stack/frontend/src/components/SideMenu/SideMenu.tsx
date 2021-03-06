import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Label from '@material-ui/icons/Label'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import './SideMenu.css'

import { Link } from 'react-router-dom'

// app parts
import { SideMenuProps } from "../../../../types/sharedTypes"

const MenuItems = ['Home', 'Data', 'Chat', 'Info']
const AppName = 'TS MERN'

type DrawerSide = 'top' | 'left' | 'bottom' | 'right'
// const classes = useStyles()


class SideMenu extends React.Component<SideMenuProps, {} > {

  public state = {
    left: false,
  }

  public componentDidMount() {
    this.setState({ left: false })
  }


  public toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    this.setState({ [side]: open })
  }

  public sideList(side: DrawerSide) {
    return (
      <div
        className='side-list'
        role="presentation"
        onClick={ this.toggleDrawer(side, false) }
        onKeyDown={ this.toggleDrawer(side, false) }
      >
        <List>
          { MenuItems.map((text, index) => (
            <Link to={ text } key={ text }>
              <ListItem button={ true } >
                <ListItemIcon><Label /></ListItemIcon>
                <ListItemText primary={ text } />
            </ListItem>
            </Link>
          )) }
        </List>
      </div>
    )
  }

  public logoutButton() {
    return (
      <Button
        id="logoutButton"
        className="side-button"
        // disabled={ this.state.isRequesting }
        // variant="outlined"
        // color="primary"
        onClick={ this.props.handleLogout }>
        Logout
        </Button>
    )
  }

  public topBar() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={ this.toggleDrawer('left', true) }
            edge="start" className="menu-button" color="inherit" aria-label="Menu">
          <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            { AppName }
            </Typography>
            { this.logoutButton() }
        </Toolbar>
      </AppBar>
    )
  }


  public render() {
    return (
      <div>
        { this.topBar() }
        <Drawer open={ this.state.left } onClose={ this.toggleDrawer('left', false) }>
          { this.sideList('left') }
        </Drawer>
      </div>
    )
  }

}

export default SideMenu

