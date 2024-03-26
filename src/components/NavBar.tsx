import "../styles/NavBar.scss";
import { useState,useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import { AuthContext } from '../AuthContext'; // Replace '../AuthContext' with the actual path to your AuthContext file
 
export function NavBar({ setLock }: { setLock: any }) {
  const [clicked, setClicked] = useState(false);
  if (clicked) {
    document.body.classList.add("locked");
  } else {
    document.body.classList.remove("locked");
  }

  const { isLoggedIn, setIsLoggedIn, setUserName, userRole ,setUserRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => { 
    localStorage.removeItem('token'); 
    localStorage.removeItem('role'); 
    localStorage.removeItem('userName'); 
    setUserName("");
    setUserRole("");
    setIsLoggedIn(false);
    navigate('/aviatoapp/');
  };

  return (
    <div className={`main-navbar ${clicked ? "clicked" : "non-clicked"}`}>
      <div className="wrapper">
        <Link to="/aviatoapp/" target="blank" className="logo-container">
          aviato
        </Link>
        <div className="nav-links">
          {userRole === 'Admin' && (
            <Link to="/aviatoapp/airports" target="blank">
              airports
            </Link>
          )}
          {userRole === 'Client' && (
          <Link to="/aviatoapp/facilities" target="blank">
            facilities
          </Link>
        )}
          {isLoggedIn ? (
          <div onClick={handleLogout}>
            log out
          </div>
        ) : (
          <Link to="/aviatoapp/login" target="blank">
            log in
          </Link>
        )}
        </div>

        <div
          className="hamburger"
          onClick={() => {
            setClicked(!clicked);
            setLock(!clicked);
          }}
        >
          <div className="top"></div>
          <div className="middle"></div>
          <div className="bottom"></div>
        </div>
      </div>
    </div>
  );
}
