import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";

export default function Navbar() {
  const token = sessionStorage.getItem("ssid");
  const username = sessionStorage.getItem("username");
  let navigate = useNavigate();

  const logout = (e) => {
    sessionStorage.removeItem("ssid");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
    localStorage.removeItem("panier");
    navigate("/");
  };

  return (
    <div>
      <div className="nav-home">
        <span>E-tsena</span>
        <div className="icone">
          <ul>
            {token ? (
              <>
                <li>
                  <Link to={"/panier"} style={{color :'white'}}>
                    {" "}
                    <i className="fa fa-cart-plus"></i>
                  </Link>
                </li>
                <li>
                  <Link onClick={logout} className="username">
                    {username}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/panier"}>
                    {" "}
                    <i className="fa fa-cart-plus"></i>
                  </Link>
                </li>
                <li>
                  <Link to={"/login"}>
                    <i className="fa fa-user"></i>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Search />
      </div>
    </div>
  );
}
