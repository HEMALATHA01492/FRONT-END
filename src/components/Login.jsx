import React from 'react';

function Login({ handleLogin, loginFormData, setLoginFormData, setIsRegistered }) {
  return (
    <div>
        <h3>Login</h3>

        <form onSubmit={handleLogin}>
          <input 
            type='text'
            placeholder='username...'
            value={loginFormData.username}
            onChange={({target}) => setLoginFormData({...loginFormData, username: target.value})}
          />

          <input 
            type='password'
            placeholder='password...'
            value={loginFormData.password}
            onChange={({target}) => setLoginFormData({...loginFormData, password: target.value})}
          />

          <button type='submit'>Login</button>
        </form>
        <p>Not Registered? <button onClick={() => setIsRegistered(false)}>Register</button></p>
      </div>
  )
}

export default Login;