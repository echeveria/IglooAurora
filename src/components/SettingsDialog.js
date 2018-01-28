import React from "react"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import { Tabs, Tab } from "material-ui/Tabs"
import TextField from "material-ui/TextField"
import FontIcon from "material-ui/FontIcon"
import Toggle from "material-ui/Toggle"
import { List, ListItem } from "material-ui/List"
import Subheader from "material-ui/Subheader"
import Divider from "material-ui/Divider"
import { Step, Stepper, StepButton, StepContent } from "material-ui/Stepper"
import SwipeableViews from "react-swipeable-views"
import { graphql } from "react-apollo"
import TwoFactorDialog from "./settings/Enabled2FA"

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
}

const listStyles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
}

const deleteDialogContentStyle = {
  width: "360px",
}

const passwordDialogContentStyle = {
  width: "350px",
}

export default class SettingsDialog extends React.Component {
  state = {
    deleteDialogOpen: false,
    passwordDialogOpen: false,
    deleteConfirmedDialogOpen: false,
    isDeleteDisabled: true,
    timer: 5,
    labelName: "Delete",
    stepIndex: 0,
    slideIndex: 0,
  }

  handleTwoFactorDialogOpen = () => {
    this.setState({ twoFactorDialogOpen: true })
  }

  handleTwoFactorDialogClose = () => {
    this.setState({ twoFactorDialogOpen: false })
  }

  handleDeleteDialogOpen = () => {
    setTimeout(this.secondsTimer, 1000)
    this.setState({
      deleteDialogOpen: true,
      isDeleteDisabled: true,
      timer: 5,
      labelName: "Delete (" + this.state.timer + ")",
    })
  }

  handleDeleteConfirmedOpen = () => {
    this.setState({ deleteConfirmedDialogOpen: true })
  }

  handlePasswordDialogOpen = () => {
    this.setState({ passwordDialogOpen: true })
  }

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialogOpen: false })
  }

  handlePasswordDialogClose = () => {
    this.setState({ passwordDialogOpen: false })
  }

  handleDeleteConfirmedClose = () => {
    this.setState({ deleteConfirmedDialogOpen: false })
  }

  handleChange = value => {
    this.setState({
      slideIndex: value,
    })
  }

  secondsTimer = () => {
    this.setState(({ timer }) => {
      if (timer > 1) {
        setTimeout(this.secondsTimer, 1000)
      }

      return {
        timer: timer - 1 || 5,
        isDeleteDisabled: timer > 1,
      }
    })
  }

  deleteConfirmed = () => {
    this.handleDeleteDialogClose()
    this.handleDeleteConfirmedOpen()
  }

  render() {
    const actions = [
      <FlatButton label="Close" onClick={this.props.closeSettingsDialog} />,
    ]

    const deleteConfimedActions = [
      <FlatButton
        label="Never mind"
        onClick={this.handleDeleteConfirmedClose}
        keyboardFocused={true}
      />,
      <RaisedButton
        label="Delete"
        primary={true}
        buttonStyle={{ backgroundColor: "#F44336" }}
      />,
    ]

    const deleteDialogActions = [
      <FlatButton
        label="Never mind"
        keyboardFocused={true}
        onClick={this.handleDeleteDialogClose}
      />,
      <RaisedButton
        label={
          this.state.isDeleteDisabled
            ? "Delete (" + this.state.timer + ")"
            : "Delete"
        }
        primary={true}
        buttonStyle={{ backgroundColor: "#F44336" }}
        disabled={this.state.isDeleteDisabled}
        style={{ width: "120px" }}
        disabledLabelColor="#751f19"
        onClick={this.deleteConfirmed}
      />,
    ]

    const passwordDialogActions = [
      <FlatButton
        label="Never mind"
        keyboardFocused={true}
        onClick={this.handlePasswordDialogClose}
      />,
      <RaisedButton
        label="Change"
        primary={true}
        buttonStyle={{ backgroundColor: "#0083ff" }}
      />,
    ]

    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.closeSettingsDialog}
        bodyStyle={{ padding: "0" }}
        repositionOnUpdate={true}
        contentStyle={{ width: "520px" }}
        className="notSelectable"
      >
        <Tabs
          inkBarStyle={{
            background: "ff4081 ",
            height: "3px",
            marginTop: "-3px",
          }}
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab
            icon={<FontIcon className="material-icons">dashboard</FontIcon>}
            label="Interface"
            buttonStyle={{ backgroundColor: "#0057cb" }}
            value={0}
          />
          <Tab
            icon={<i className="material-icons">notifications</i>}
            label="Notifications"
            buttonStyle={{ backgroundColor: "#0057cb" }}
            value={1}
          />
          <Tab
            icon={<FontIcon className="material-icons">account_box</FontIcon>}
            label="Account"
            buttonStyle={{ backgroundColor: "#0057cb" }}
            value={2}
          />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
          enableMouseEvents
        >
          <div
            style={{
              overflowY: "auto",
              height: "500px",
            }}
          >
            <div style={listStyles.root}>
              <List style={{ width: "100%" }}>
                <Subheader>Controls</Subheader>
                <ListItem
                  primaryText="Enable advanced options for color selector"
                  rightToggle={
                    <Toggle
                      thumbSwitchedStyle={{ backgroundColor: "#0083ff" }}
                      trackSwitchedStyle={{ backgroundColor: "#71c4ff" }}
                      rippleStyle={{ color: "#0083ff" }}
                    />
                  }
                />
              </List>
            </div>
          </div>
          <div
            style={{
              overflowY: "auto",
              height: "500px",
            }}
          >
            <div style={listStyles.root}>
              <List style={{ width: "100%" }}>
                <Subheader>Lorem Ipsum</Subheader>
                <ListItem
                  primaryText="Quiet mode"
                  secondaryText="Mute all notifications"
                  rightToggle={
                    <Toggle
                      thumbSwitchedStyle={{ backgroundColor: "#0083ff" }}
                      trackSwitchedStyle={{ backgroundColor: "#71c4ff" }}
                      rippleStyle={{ color: "#0083ff" }}
                    />
                  }
                />
                <Subheader>Lorem Ipsum</Subheader>
              </List>
            </div>
          </div>
          <div
            style={{
              overflowY: "auto",
              height: "500px",
            }}
          >
            <List>
              <Subheader>Authentication</Subheader>
              <ListItem
                primaryText="Change password"
                onClick={this.handlePasswordDialogOpen}
              />
              <ListItem
                primaryText="Two-factor authentication"
                secondaryText="Make your account safer by verifying it is actually you"
                rightToggle={
                  <Toggle
                    thumbSwitchedStyle={{ backgroundColor: "#0083ff" }}
                    trackSwitchedStyle={{ backgroundColor: "#71c4ff" }}
                    rippleStyle={{ color: "#0083ff" }}
                    onToggle={this.handleTwoFactorDialogOpen}
                  />
                }
              />
              <Divider />
              <Subheader>Account management</Subheader>
              <ListItem
                primaryText="Delete your account"
                onClick={this.handleDeleteDialogOpen}
                style={{ color: "#F44336 " }}
              />
            </List>
          </div>
        </SwipeableViews>
        <Dialog
          title="Are you sure you want to delete your account?"
          actions={deleteDialogActions}
          open={this.state.deleteDialogOpen}
          contentStyle={deleteDialogContentStyle}
          onRequestClose={this.handleDeleteDialogClose}
          className="notSelectable"
        >
          Be careful, your data will be erased permanently
        </Dialog>
        <Dialog
          title="Change your password"
          actions={passwordDialogActions}
          open={this.state.passwordDialogOpen}
          contentStyle={passwordDialogContentStyle}
          onRequestClose={this.handlePasswordDialogClose}
          className="notSelectable"
        >
          <TextField
            floatingLabelShrinkStyle={{ color: "#0083ff" }}
            underlineFocusStyle={{ borderColor: "#0083ff" }}
            floatingLabelText="Old Password"
            type="password"
            style={{ width: "100%" }}
          />
          <TextField
            floatingLabelShrinkStyle={{ color: "#0083ff" }}
            underlineFocusStyle={{ borderColor: "#0083ff" }}
            floatingLabelText="New Password"
            type="password"
            style={{ width: "100%" }}
          />
        </Dialog>
        <Dialog
          title="Type your password"
          actions={deleteConfimedActions}
          open={this.state.deleteConfirmedDialogOpen}
          contentStyle={passwordDialogContentStyle}
          onRequestClose={this.handleDeleteConfirmedClose}
          className="notSelectable"
        >
          <TextField
            floatingLabelShrinkStyle={{ color: "#0083ff" }}
            underlineFocusStyle={{ borderColor: "#0083ff" }}
            floatingLabelText="Password"
            type="password"
            style={{ width: "100%" }}
          />
        </Dialog>
        <TwoFactorDialog
          isOpen={this.state.twoFactorDialogOpen}
          handleTwoFactorDialogOpen={this.handleTwoFactorDialogOpen}
          handleTwoFactorDialogClose={this.handleTwoFactorDialogClose}
        />
      </Dialog>
    )
  }
}
