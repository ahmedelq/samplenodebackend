import axios from 'axios'
const baseUrl = '/api/login'
const doLogin = creds => {
 return  axios
    .post(`${baseUrl}/`, creds);
}

export default {doLogin};
