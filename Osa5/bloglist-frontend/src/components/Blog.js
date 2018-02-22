import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.blog._id,
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes,
      user: props.blog.user,
      showAll: false
    }
    this.parent = props.parent
  }

  toggleShowAll = () => {
    this.setState({
      showAll: !this.state.showAll
    })
  }

  like = () => {
    this.parent.like(this.state.id)
    this.setState({
      likes: this.state.likes + 1
    })
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const showAll = this.state.showAll

    if (showAll) {
      return (
        <div>
          {showAll ? (
            <div style={blogStyle}>
              <div onClick={this.toggleShowAll}>
                {this.state.title} by {this.state.author}
              </div>
              <div>
                {this.state.likes} likes{' '}
                <button onClick={this.like}>like</button>
              </div>
              <div>{this.state.url}</div>
              <div>added by {this.state.user.name}</div>
            </div>
          ) : (
            <div style={blogStyle} onClick={this.toggleShowAll}>
              {this.state.title} {this.state.author}
            </div>
          )}
        </div>
      )
    }
    return (
      <div style={blogStyle} onClick={this.toggleShowAll}>
        {this.state.title} {this.state.author}
      </div>
    )
  }
}

export default Blog
