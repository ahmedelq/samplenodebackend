import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login.js'
import Toggle from './components/Toggle.js'
import BlogForm from './components/BlogForm.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({});
  const [not, setNot] = useState('');
  const [vBlogs, setVBlogs] = useState({});

  const toggleBlog = blogId => 
  { 
    const isVisible = vBlogs[blogId]
    const nvBlogs = {...vBlogs}
    nvBlogs[blogId] = !isVisible;
    setVBlogs(nvBlogs)
  }

  const blogFormRef = useRef();
  useEffect(() => {
    const nvBlog = {}; 
    blogService.getAll().then(blogs => {
      blogs.map(blog => {nvBlog[blog.id] = false});
      setBlogs( blogs )
      setVBlogs(nvBlog)
    })  
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
  const display = ()  =>  isUserSet() ? <UserStatus name={user.name}/> : <Toggle outroBtnName="cancel" introBtnName="login"><Login setUser={setUser} setNot={setNot} /></Toggle>
  const create = (event) => {
    event.preventDefault();
    blogFormRef.current.toggle();
    const title = event.target[0].value
    const author = event.target[1].value
    const url = event.target[2].value
    blogService
      .insert({title, author, url})
      .then(res => {
        console.log(res)
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
        <Toggle ref={blogFormRef} outroBtnName="cancel" introBtnName="add new note">
          <BlogForm addBlog={create} />
         </Toggle>} 
      {blogs.map(blog =>
        <Blog key={blog.id} blog={{...blog, isVisible:vBlogs[blog.id]}} toggleBlog={toggleBlog}/>
      )}
    </div>
  )
}

export default App
