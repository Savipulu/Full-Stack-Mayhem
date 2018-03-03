let token = null

const blogs = [
  {
    _id: '5a451df7571c224a31b5c8ce',
    title: 'Blog1',
    author: '?? ??',
    url: 'www.x.com',
    likes: 2,
    user: {
      _id: '5a88e2580d52c9768c230869',
      username: 'Savipulu',
      name: 'Jouni Winter'
    }
  },
  {
    _id: '5a451e21e0b8b04a45638211',
    title: 'Blog2',
    author: '??? ???',
    url: 'www.y.com',
    likes: 5,
    user: {
      _id: '5a88e2580d52c9768c230869',
      username: 'Savipulu',
      name: 'Jouni Winter'
    }
  },
  {
    _id: '5a451e30b5ffd44a58fa79ab',
    title: 'Blog3',
    author: '???? ????',
    url: 'www.z.com',
    likes: 1,
    user: {
      _id: '5a88e2580d52c9768c230869',
      username: 'Savipulu',
      name: 'Jouni Winter'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  return true
}

export default { getAll, setToken, blogs }
