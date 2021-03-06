import React from 'react'
import {Card, Image, Icon, Button} from 'semantic-ui-react'
import Modal from './Modal'
import {Query} from 'react-apollo'
import {query} from "../RestaurantProfile/graphql";
import CustomLoader from '../Loader';
class RestaurantPosts extends React.PureComponent {
  state = {
    modal: false
  }
  openModal = (index = -1) => this.setState({modal: true, post: index})
  closeModal = () => this.setState({modal: false})
  render () {
    document.body.style.overflowY = this.state.modal ? 'hidden' : 'scroll'
    return (
      <Query query={query} variables={{id: localStorage['id']}}>
        {({loading, error, data}) => {
          if (loading)
            return <CustomLoader size='huge' />
          if (error)
            return `${error}`
          const posts = data.restaurant[0].posts
          const name = data.restaurant[0].name
          return data && (
            <div className="restaurant_posts">
              <div className="restaurant_posts__header">
                {this.state.modal && <Modal closeModal={this.closeModal} posts={this.state.post > -1 ? posts[this.state.post] : null} active={this.state.modal} />}
                <h1>Postagens</h1>
                <Button basic circular className="restaurant_posts__addbutton" animated color='blue' onClick={this.openModal}>
                  <Button.Content hidden>Novo</Button.Content>
                  <Button.Content visible>
                    <Icon name='plus' />
                  </Button.Content>
                </Button>
              </div>
              <Card.Group itemsPerRow={3} style={{zIndex: this.state.modal ? '-1' : '1', width: "100%"}}>
                {posts.map((post, index) => (
                  <Card link onClick={() => this.openModal(index)} href={`#/restaurant/posts/${post.id}`} key={index}>
                    <Image  className="restaurant_posts__image" src={post.image_url} />
                    <Card.Content>
                      <Card.Header>{post.title}</Card.Header>
                      <Card.Meta>{name}</Card.Meta>
                      <Card.Description>{post.content.replace(/(<([^>]+)>)/ig, '').substring(0,100)}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name='user' />
                      {posts[index].likes.length > 0 ? posts[index].likes.length === 1 ? "1 pessoa curtiu" : posts[index].likes.length + ' pessoas curtiram' : 'Ainda não teve curtidas'}
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            </div>
          )
        }}
      </Query>
    )
  }
}
export default RestaurantPosts