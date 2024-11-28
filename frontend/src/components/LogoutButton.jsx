import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return <button className='logout-btn' onClick={logOut}>Log out</button>;
}

export default LogoutButton;
