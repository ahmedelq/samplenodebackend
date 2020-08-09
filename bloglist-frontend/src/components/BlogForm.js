import React, {useState} from 'react'

const BlogForm = ({addBlog}) => {
const [author, setAuthor] = useState('Some Author');
const [title, setTitle] = useState('Some Title');
const [url, setUrl] = useState('https://google.com');

return(<form onSubmit={(e) => addBlog(e)}>
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
      </form>)
}

export default BlogForm
