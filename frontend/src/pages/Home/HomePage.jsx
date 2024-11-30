import { Link } from "react-router-dom";

import "./HomePage.css";

export function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to Acebook!</h1>
      <div className="user-auth">
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>        
      </div>
    </div>
  );
}
