import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import ShowBlogs from './components/showBlogs'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('user')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            blogService.setToken(user.token)
            window.localStorage.setItem('user', JSON.stringify(user))
            setUser(user)
            setUsername(username)
            setPassword(password)
        } catch (exception) {
            setNotification('wrong username or password')
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const logout = () => {
        window.localStorage.removeItem('user')
        location.reload()
    }

    const createBlog = async ({ title, author, url }) => {

        let newBlog = await blogService.create({ 'title': title, 'author': author, 'url': url })
        setBlogs(blogs.concat(newBlog))
        setNotification(`a new blog ${title} by ${author} added`)

        setTimeout(() => {
            setNotification(null)
        }, 5000)
        location.reload()
    }

    const updateBlog = async ({ blog }) => {
        let updatedBlog = await blogService.update({
            'user': blog.user.id,
            'likes': blog.likes + 1,
            'author': blog.author,
            'title': blog.title,
            'url': blog.url
        }, blog.id)
        setBlogs(blogs.concat(updatedBlog))
        location.reload()

    }

    const deleteBlog = async ({ blog }) => {
        await blogService.remove(blog)
        let newBlogs = blogs.filter(element => element.id !== blog.id)
        setBlogs(newBlogs)
    }

    const compareLikes = (a,b) => {
        return b.likes - a.likes
    }




    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])


    return (
        <div>
            <Notification message={notification} />
            {!user && <LoginForm
                handleLogin={handleLogin}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
            />}
            {user && <div>
                <h1>Blogs</h1>
                <p>{user.name} logged in <button onClick={logout}>Logout</button> </p>
                {<Togglable>
                    <ShowBlogs createBlog={createBlog} />
                </Togglable>}
                <div>
                    {blogs.sort(compareLikes).map((blog, index) =>
                        <div key={index}>
                            <Blog blog={blog} updateBlog={updateBlog} user={user} deleteBlog={deleteBlog} />
                        </div>
                    )}
                </div>
            </div>
            }
        </div>
    )
}

export default App