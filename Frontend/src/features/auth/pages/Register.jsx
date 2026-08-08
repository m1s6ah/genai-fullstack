import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import '../auth.form.scss'

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Registration failed')
        setLoading(false)
        return
      }

      navigate('/login')
    } catch (err) {
      setError('Unable to connect to the server. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

<form onSubmit={handleSubmit}>

    <div className = "input-group">
       <label htmlFor = "username">Username</label>
       <input
         type="text"
         id="username"
         name="username"
         placeholder="Enter username"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
       />
    </div>

    <div className = "input-group">
       <label htmlFor = "email">Email</label>
       <input
         type="email"
         id="email"
         name="email"
         placeholder="Enter email address"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
       />
    </div>

   <div className = "input-group">
       <label htmlFor = "password">Password</label>
       <input
         type="password"
         id="password"
         name="password"
         placeholder="Enter password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
       />
    </div>

    {error && <p className="error">{error}</p>}

    <button className='button primary-button' disabled={loading}>
      {loading ? 'Registering...' : 'Register'}
    </button>

</form>

<p>Don't have an account? <Link to="/login">Login</Link></p>
      {/* <p>dddd</p> */}
            </div>

    </main>
  )
}
export default Register