import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css'
import { login } from "../../services/authentication";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

export function LoginPage() {

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/feed");
    } catch (err) {
      console.error(err);
      // Display an alert with the error message
      alert("❌ Login failed ❌ Incorrect email or password. Please try again.");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}
      className="login-form"
      >
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          className="user-field"
        />
        <label htmlFor="password">Password:</label>
        <div className="login-password">
        <input
          id="password"
          type={showPassword ? 'text': 'password'}
          value={password}
          onChange={handlePasswordChange}
          className="user-field"
        />
        {showPassword ?
          <IoIosEyeOff
          className="show-password" 
          type='button'
          onClick={(e) => {
            e.preventDefault()
            setShowPassword(!showPassword)}}/>
        :
          <IoIosEye 
          className="show-password"
          type='button'
          onClick={(e) => {
            e.preventDefault()
            setShowPassword(!showPassword)}}/>
        }
        </div>
        <input role="submit-button" id="submit" type="submit" value="SUBMIT" />
        <div>
          <Link to='/signup'>Create An Account</Link>
        </div>
      </form>
    </>
  );
}
