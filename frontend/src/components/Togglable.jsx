import { useState, forwardRef } from 'react'

// eslint-disable-next-line no-undef
const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button type="submit" onClick={toggleVisibility}>new blog</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button type="submit" onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'


export default Togglable