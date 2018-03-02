const initialState = 'Alkuarvo'

const reducer = (store = initialState, action) => {
  if (action.type === 'NOTIFY') {
    store.notification = action.content
  }

  return store
}

export const notify = content => {
  return {
    type: 'NOTIFY',
    content
  }
}

export default reducer
