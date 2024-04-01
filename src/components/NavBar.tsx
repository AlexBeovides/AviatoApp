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

  const { token, setToken, userRole ,setUserRole } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => { 
    localStorage.removeItem('token');  
    setToken("");
    setUserRole("");
    navigate('/aviatoapp/');
  };

  return (
    <div className={`main-navbar ${clicked ? "clicked" : "non-clicked"}`}>
      <div className="wrapper">
        <Link to="/aviatoapp/" target="blank" className="logo-container">
          aviato
        </Link>
        <div className="nav-links">

          {token && userRole === 'Admin' && (
            <Link to="/aviatoapp/workers_manager" target="blank">
              workers
            </Link>
          )}

          {token && userRole === 'Admin' && (
            <Link to="/aviatoapp/airports_manager" target="blank">
              airports
            </Link>
          )}

          {token && (userRole === 'Director') && (
            <Link to="/aviatoapp/facilities_manager" target="blank">
              facilities
            </Link>
          )}
          
          {token && (userRole === 'Director') && (
            <Link to="/aviatoapp/services_manager" target="blank">
              services
            </Link>
          )}

          {token && (userRole === 'Director') && (
            <Link to="/aviatoapp/reviews_manager" target="blank">
              reviews
            </Link>
          )}

          {token && userRole === 'Security' && (
            <Link to="/aviatoapp/clients_manager" target="blank">
              clients
            </Link>
          )}

          {token && userRole === 'Security' && (
            <Link to="/aviatoapp/planes_manager" target="blank">
              planes
            </Link>
          )}

          {token && userRole === 'Client' && (
          <Link to="/aviatoapp/facilities" target="blank">
            facilities
          </Link>
          )}

          {token && userRole === 'Client' && (
          <Link to="/aviatoapp/myplanes" target="blank">
            my planes
          </Link>
          )}

          {token ? (
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
