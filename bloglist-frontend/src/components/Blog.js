import React from 'react'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
}
const hiddenCSS = isVisible => ({display: isVisible ? "" : "none"}) 
const btnLbl = isVisible => isVisible ? "hide" : "view"; 
const Blog = ({ blog, toggleBlog, userId, doLike, doRemove}) => (
  <>
  <div style={blogStyle}>
    <span>{blog.title} {blog.author}</span>
    <button onClick={() => toggleBlog(blog.id)}> {btnLbl(blog.isVisible)} </button>
    <div style={hiddenCSS(blog.isVisible)}> 
      <p>{blog.url}</p>
      <p>likes: {blog.likes}<button onClick={() => doLike(blog.id)}>like</button></p>
      <p>{blog.author}</p>
      {blog.user.username === userId && <button onClick={() => doRemove(blog.id)}>remove</button>}
    </div> 
  </div>
 </>
)

export default Blog
