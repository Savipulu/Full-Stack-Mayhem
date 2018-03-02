import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if (this.props.store.getState().notification) {
      return <div style={style}>{this.props.store.getState().notification}</div>
    }
    return null
  }
}

export default Notification
