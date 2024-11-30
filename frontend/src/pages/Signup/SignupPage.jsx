import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";
import './SignupPage.css'

export function SignupPage() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    username: '',
    firstname: '',
    lastname: ''
  })

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signup(userInfo);
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  }


  const handleInputChanges = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  } 

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}
      className="signup-form"
      >
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          name='email'
          value={userInfo.email}
          placeholder="email"
          onChange={handleInputChanges}
          className="user-field"
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          name='password'
          value={userInfo.password}
          onChange={handleInputChanges}
          className="user-field"
        />
        <label htmlFor="username">Username:</label>
        <input
          placeholder="username"
          id="username"
          type="text"
          name='username'
          value={userInfo.username}
          onChange={handleInputChanges}
          className="user-field"
        />
        <label htmlFor="firstname">First Name:</label>
        <input
          placeholder="firsname"
          id="firstname"
          type="text"
          name='firstname'
          value={userInfo.firstname}
          onChange={handleInputChanges}
          className="user-field"
        />
        <label htmlFor="lastname">Last Name:</label>
        <input
          placeholder="lastname"
          id="lastname"
          type="text"
          name='lastname'
          value={userInfo.lastname}
          onChange={handleInputChanges}
          className="user-field"
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
        <div>
          <Link to='/login'>Already Have An Account</Link>
        </div>
      </form>
    </>
  );
}
