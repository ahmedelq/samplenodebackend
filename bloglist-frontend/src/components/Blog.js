import React from 'react'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
}
const hiddenCSS = isVisible => ({display: isVisible ? "" : "none"}) 
const visibleCSS = isVisible => ({display: isVisible ? "none" : ""}) 
const btnLbl = isVisible => isVisible ? "hide" : "view"; 
const Blog = ({ blog, toggleBlog }) => (
  
  <>
  <div style={blogStyle}>
    <span>{blog.title} {blog.author}</span>
    <button onClick={() => toggleBlog(blog.id)}> {btnLbl(blog.isVisible)} </button>
    <span style={hiddenCSS(blog.isVisible)}> Hello World </span> 
  </div>
 </>
)

export default Blog
