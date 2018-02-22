import axios from 'axios'
const baseUrl = 'http://localhost:3004/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async updatedBlog => {
  const response = await axios.put(`${baseUrl}/${updatedBlog._id}`, updatedBlog)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blog._id}`, config)
  return response.data
}
export default { getAll, createBlog, setToken, updateBlog, deleteBlog }
