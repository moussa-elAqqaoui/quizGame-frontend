import {Input} from 'antd'
const { Search } = Input;

import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <Search
          placeholder="Enter your username here"
          enterButton="Join now"
          size="large"
          onSearch = {value => this.props.handler({isJoinedIn: true, userName: value})}
        />
      </div>
    )
  }
}
