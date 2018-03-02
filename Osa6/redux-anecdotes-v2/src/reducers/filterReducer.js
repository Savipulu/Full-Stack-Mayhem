const initialState = ''

const reducer = (store = initialState, action) => {
  if (action.type === 'FILTER') {
    store = action.content
  }

  return store
}

export const filter = content => {
  return {
    type: 'FILTER',
    content
  }
}

export default reducer
