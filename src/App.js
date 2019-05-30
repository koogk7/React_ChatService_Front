import React, { Component } from 'react';
import requestChatList from './server_side/RequestChatList'

class App extends Component {

  componentDidMount() {
    console.log("componentDidMount!");
    requestChatList();
  }

  render() {
    return (
        <div>
          App
        </div>
    )
  }
}

export default App;