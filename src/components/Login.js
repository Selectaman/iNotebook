import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login(props) {
  const host = 'https://inotebook-4o7m.onrender.com';
    const [credentials, setcredentials] = useState({email: '', password: ''})
    let history = useHistory();
    const handleOnChange = (e)=> {
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e)=> {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const json = await response.json();
        

        if(json.success){
            // save the authtoken and redirect
            localStorage.setItem('token', json.authToken)
            history.push('/')
            props.showAlert('Successfully Logged In', 'success')            
        }
        else{
            props.showAlert(response.error, 'danger');
        }
    }
  return (
    <div className="mt-2">
        <h1>Login to iNotebook</h1>
    <form onSubmit={handleSubmit} >
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input type="email" name='email' value={credentials.email} onChange={handleOnChange} className="form-control" id="email" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input type="password" value={credentials.password} name='password' onChange={handleOnChange} className="form-control" id="password" />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    </div>
  );
}

export default Login;
