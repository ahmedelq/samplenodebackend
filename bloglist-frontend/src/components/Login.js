import React, {useState} from 'react'
import req from '../services/login.js'

const Login = ({setUser, setNot}) => { 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState('');
  const handleLogin = (event) => {
    event.preventDefault();
    req.doLogin({username, password})
      .then(result => {
        console.log(result)
        console.log('success')
        setUsername('');
        setPassword('');
        window.localStorage.setItem('user', JSON.stringify(result.data));
        setUser(result.data)

      })
      .catch(err => setNot('Invalid credintials') );
  }

return (<>
  <form onSubmit={handleLogin}>
    <div>
      <span>username</span>
      <input type="text"
      value={username}
      onChange={({target}) => setUsername(target.value) }/>
    </div>

    <div>
      <span>password</span>
      <input type="password"
      value={password}
      onChange={({target}) => setPassword(target.value)} />
    </div>

    <button type="submit">Submit</button>
  </form>  
  </>)}

export default Login;
