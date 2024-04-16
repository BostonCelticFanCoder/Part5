import { useState } from 'react'


const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }


    return (
        <div className='blog'>
            {blog.title} {blog.author}
            <div style={hideWhenVisible}>
                <button type="submit" onClick={toggleVisibility}>view</button>
            </div>
            <div style={showWhenVisible}>
                <div className="content">
                    <a className="url" href={blog.url}>{blog.url} </a>
                    <br></br>
                likes: {blog.likes} <button className="likes" type="submit" onClick={(e) => {
                        e.preventDefault()
                        updateBlog({ blog: blog })
                    }}>like</button>
                    <br></br>
                    {blog.user.username}
                    <br></br>
                    {user.username === blog.user.username && <button type="submit" onClick={(e) => {
                        e.preventDefault()
                        deleteBlog({ blog:blog })
                    }}>Delete</button>}
                </div>
                <button type="submit" className="details" onClick={toggleVisibility}>hide</button>
            </div>
        </div>
    )
}

export default Blog