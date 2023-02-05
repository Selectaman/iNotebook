import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup(props) {
    let history = useHistory();
    const host = 'https://inotebook-4o7m.onrender.com';
    // http://localhost:8000/api/auth/createuser
    const [credentials, setcredentials] = useState({name: '', email: '', password: '', cpassword: ''})
    const handleSubmit = async(e)=> {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        })
        const json = await response.json();
        //console.log(json.success);  
        // save the user and redirect to home page

        if(json.success){
            localStorage.setItem('token', json.authToken);
            history.push('/');
            props.showAlert('Account Created Succesfully', 'success')
        }
        else{
            props.showAlert(json.error, 'danger');
        }
                 
    }
    const handleOnChange = (e)=> {
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="mt-2">
        <h1>Register to iNotebook</h1>
    <form onSubmit={handleSubmit} >
        <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input type="text" name='name' value={credentials.name} onChange={handleOnChange} className="form-control" id="name" aria-describedby="emailHelp" required minLength='3' />
      </div>
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
        <input type="password" value={credentials.password} name='password' onChange={handleOnChange} className="form-control" id="password" required minLength='5' />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input type="password" value={credentials.cpassword} name='cpassword' onChange={handleOnChange} className="form-control" id="cpassword" required minLength='3' />
      </div>
      <button disabled={credentials.name < 3 || credentials.password < 5 || credentials.cpassword < 5 } type="submit" className="btn btn-primary">
        SignUp
      </button>
    </form>
    </div>
  );
}

export default Signup;
