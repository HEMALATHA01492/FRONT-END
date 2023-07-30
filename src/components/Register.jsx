import React from 'react';

function Register({ handleRegister, registerFormData, setRegisterFormData, setIsRegistered }) {
  return (
    <div>
        <h3>Register</h3>

        <form onSubmit={handleRegister}>
          <input 
            type='text'
            placeholder='username...'
            value={registerFormData.username}
            onChange={({target}) => setRegisterFormData({...registerFormData, username: target.value})}
          />

          <input 
            type='text'
            placeholder='name...'
            value={registerFormData.name}
            onChange={({target}) => setRegisterFormData({...registerFormData, name: target.value})}
          />

          <input 
            type='password'
            placeholder='password...'
            value={registerFormData.password}
            onChange={({target}) => setRegisterFormData({...registerFormData, password: target.value})}
          />

          <button type='submit'>Register</button>
        </form>

        <p>Already Registered? <button onClick={() => setIsRegistered(true)}>Login</button></p>
      </div>
  )
}

export default Register;