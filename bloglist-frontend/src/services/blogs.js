import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null;
const setToken = newToken => token = `bearer ${newToken}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const insert = (obj) =>{ 
  const config  = {
    headers: {Authorization: token}
  }
  console.log(config)
  return axios.post(baseUrl, obj, config)
}
export default { insert, setToken, getAll }
