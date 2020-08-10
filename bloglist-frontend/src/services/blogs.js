import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null;
const setToken = newToken => token = `bearer ${newToken}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = obj => axios.put(`${baseUrl}/${obj.id}`, obj)

const insert = (obj) =>{ 
  const config  = {
    headers: {Authorization: token}
  }
  return axios.post(baseUrl, obj, config)
}
const remove = (blogId) => {
  const config  = {
    headers: {Authorization: token}
  }
  return axios.delete(`${baseUrl}/${blogId}`, config)
}
export default { remove, update, insert, setToken, getAll }
