const initialState = ''

const reducer = (store = initialState, action) => {
  if (action.type === 'NOTIFY') {
    store = action.content
  }

  return store
}

export const notify = content => {
  return {
    type: 'NOTIFY',
    content
  }
}

export const clearNotification = () => {
  return {
    type: 'NOTIFY',
    content: ''
  }
}

export default reducer
