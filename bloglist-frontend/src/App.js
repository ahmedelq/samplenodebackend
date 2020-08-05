import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({});
  const [author, setAuthor] = useState('Some Author');
  const [title, setTitle] = useState('Some Title');
  const [url, setUrl] = useState('https://google.com');
  const [not, setNot] = useState('');
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

    useEffect(()=> {
    let user = window.localStorage.getItem('user')
      if(user) {
        user = JSON.parse(user)
        console.log(user)
        setUser(user)
        blogService.setToken(user.token)
      }
    }, [])

  useEffect( ()=> {
    if(Object.keys(user).length !==0)
    blogService.setToken(user.token)
  }, [user]) 

  const UserStatus = ({name}) => <>
    <div>
      <span>{name} logged in</span>
      <button onClick={() => {
      setUser({})
      window.localStorage.clear()}}>logout</button>
    </div>
  </>
  const isUserSet = () => Object.keys(user).length !==0 ;
  const display = ()  =>  isUserSet() ? <UserStatus name={user.name}/> : <Login setUser={setUser} setNot={setNot} />
  const create = (event) => {
    event.preventDefault();
    blogService
      .insert({author, title, url})
      .then(res => {
        console.log(res)
        setTitle('')
        setUrl('')
        setAuthor('')
        setBlogs(blogs.concat({...res.data}))
        setNot(`a new blog ${title} by ${author} added`);
      })
      .catch(err => console.log(err))
  }

 
  return (
    <div>
      <h2>blogs</h2>
      <p>{not}</p>
      {display()}      
      {isUserSet() && 
        <form onSubmit={(e) => create(e)}>
        <div>
          <span>title</span>
          <input type="text" value={title} onChange={ ({target}) => setTitle(target.value) } />
        </div>

        <div>
          <span>author:</span>
          <input type="text" onChange={({target}) => setAuthor(target.value)} value={author}/>
        </div>

        <div>
          <span>url:</span>
          <input type="text" onChange={({target}) => setUrl(target.value)} value={url}/>
        </div>
        <button type="submit">create</button>
      </form>} 
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
