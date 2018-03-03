const initialState = ''

const reducer = (store = initialState, action) => {
  if (action.type === 'NOTIFY') {
    store = action.content
  }

  return store
}

export const notify = (content, seconds = 5) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      content
    })
    setTimeout(() => dispatch({ type: 'NOTIFY', content: '' }), seconds * 1000)
  }
}

export default reducer
