import axios from 'axios';
import { useEffect, useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {

  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    name: '',
    password: ''
  });

  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUserJSON = window.sessionStorage.getItem('loggedInUser');

    if(loggedInUserJSON){
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();

    console.log('Registering user...');

    try {
      const response = await axios.post('http://localhost:3001/api/users', registerFormData);

      console.log('Registration successful!');

      setIsRegistered(true);

      setRegisterFormData({
        username: '',
        name: '',
        password: ''
      });

    } catch(error){
      console.error('Error registering user', error);
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log('logging in...');
    try {
      const response = await axios.post('http://localhost:3001/api/login', loginFormData);

      const user = response.data;

      setToken(user.token);
      setUser(user);
      window.sessionStorage.setItem('loggedInUser', JSON.stringify(user));

      // clear the form
      setLoginFormData({
        username: '',
        password: ''
      });

      console.log('login successfull');

    } catch(error){
      console.error('Error logging in', error);
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.sessionStorage.removeItem('loggedInUser');
    setIsRegistered(true);
  }

  return (
    <div>
      <h2>Notes Application</h2>

      {
        user ? (
          <Dashboard user={user} handleLogout={handleLogout} />
        ) : (
          isRegistered ? (
            <Login handleLogin={handleLogin} loginFormData={loginFormData} setLoginFormData={setLoginFormData} setIsRegistered={setIsRegistered} />
          ) : (
            <Register handleRegister={handleRegister} registerFormData={registerFormData} setRegisterFormData={setRegisterFormData} setIsRegistered={setIsRegistered} />
          )
        )
      }
    </div>
  )
}

export default App;