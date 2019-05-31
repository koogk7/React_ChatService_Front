import React, { Component } from 'react';
import UsernameGenerator from "username-generator";
import SockJsClient from "react-stomp";
import Fetch from "json-fetch"
import { TalkBox } from "react-talk"
import randomstring from "randomstring"


class App extends Component {

  constructor(props){
    super(props);
    this.randomUserName = UsernameGenerator.generateUsername("-");
    this.randomUserId = randomstring.generate();
    this.sendURL = "/message";
    this.state = {
        clientConnected : false,
        messages : []
    }
  }

  onMessageReceive = (msg, topic) => {
    console.log(JSON.stringify(msg) + " @ " + JSON.stringify(this.state.messages) + "@" + JSON.stringify(topic));
    this.setState(prevState => ({
        messages: [...prevState.messages, msg]
    }));
  };

  sendMessage = (msg, selfMsg) => {
    try{
      let send_message = {
          "user" : selfMsg.author,
          "message": selfMsg.message
      };
      this.clientRef.sendMessage("/app/message", JSON.stringify(send_message));
    } catch (e) {
        return false;
    }
  };

  componentWillMount() {
    console.log("call history");
    Fetch("http://localhost:8080/history", {
        method: "GET",
        // headers: {
        //     'Access-Control-Allow-Origin':'*',
        //     'Access-Control-Allow-Credentials': 'true'
        // },
        // cache:'no-cache',
        mode: 'no-cors'
    }).then((response) => {
      console.log(response);
      if(response.body !== undefined)
      this.setState({ messages: response.body });
    });
  }

  render() {
    const wsSourceUrl = "http://localhost:8080/chatting";
    return (
        <div>
          <TalkBox topic="/topic/public" currentUserId={ this.randomUserId }
                   currentUser={ this.randomUserName} messages={ this.state.messages}
                   onSendMessage={ this.sendMessage } connected={ this.state.clientConnected}/>

            <SockJsClient url={ wsSourceUrl } topics={["/topic/public"]}
                          onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                          onConnect={ () => {this.setState({ clientConnected: true }) } }
                          onDisconnect={ () => { this.setState({ clientConnected: false }) } }
                          debug={ false } style={[{width:'100%', height:'100%'}]}/>
        </div>
    )
  }
}

export default App;