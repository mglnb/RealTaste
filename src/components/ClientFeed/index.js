import React from "react";
import FeedComponent from './FeedComponent'
import Logo from '../Logo'
import {Feed} from 'semantic-ui-react'
import io from 'socket.io-client'
class ClientFeed extends React.Component {
    state ={
      posts: []
    }
    componentWillMount() {
      fetch('//godinner-backend.herokuapp.com/app/feed')
        .then(res => res.json())
        .then(json => this.setState({posts: json.reverse()}))
        const socket = io("//godinner-socket-miguelc2.c9users.io/");
        window.socket = socket
        socket.on('init', socket => {
          console.log(socket)
        })
        socket.on('postAddedClient', () => {
          console.log('postAddedClient')
          fetch('//godinner-backend.herokuapp.com/app/feed')
            .then(res => res.json())
            .then(json => this.setState({posts: json.reverse()}))
        })
    }

    render() {
        return (
            <div className="feed">
              <div className="feed__wrapper">
                <Logo/>
                <Feed>
                {this.state.posts.map((post,index) => (
                  <FeedComponent post={post} key={index} />
                ))}
                </Feed>
              </div>
            </div> 
        )
    }
}

export default ClientFeed
