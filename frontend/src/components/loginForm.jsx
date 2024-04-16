import propTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, setPassword, setUsername }) => (
    <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
        username
            <input
                type="text"
                value={username}
                name="Username"
                data-testid="username"
                onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
        password
            <input
                type="password"
                value={password}
                name="Password"
                data-testid="password"
                onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
    </form>
)

LoginForm.propTypes = {
    handleLogin: propTypes.func.isRequired,
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
    setPassword: propTypes.func.isRequired,
    setUsername: propTypes.func.isRequired,
}

export default LoginForm