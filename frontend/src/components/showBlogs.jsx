import { useState } from 'react'

const ShowBlogs = ({ createBlog  }) => {
    const addBlog = (event) => {
        event.preventDefault()
        let title = document.getElementById('title')
        let author = document.getElementById('author')
        let url = document.getElementById('url')
        createBlog({
            title: title.value,
            author: author.value,
            url: url.value
        })
    }

    return (
        <div>
            <form onSubmit={addBlog} >
                <h1>Create New</h1>
                <div>
        title:
                    <input type="text" id="title" className="title" placeholder='Define Title Here' />
                </div>
                <div>
        author:
                    <input type="text" id="author" className="author" placeholder='Define Author Here'/>
                </div>
                <div>
        url:
                    <input type="text" id="url" className="url" placeholder='Define URL Here'/>
                </div>
                <button className='create' type="submit">create</button>
            </form>
        </div>
    )
}


export default ShowBlogs