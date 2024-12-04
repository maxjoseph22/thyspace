import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./HomePage.css";

export function HomePage() {

  useEffect(() => {
    document.body.classList.add("homepage");
    return () => {
      document.body.classList.remove("homepage");
    };
  }, []);

  return (
    <div className="home">
      <h1>WELCOME TO THY SPACE</h1>
      <div className="user-auth">
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
