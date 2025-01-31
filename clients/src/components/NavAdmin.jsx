import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NavAdmin() {
  const token = localStorage.getItem("ssid");
  const username = localStorage.getItem("username");
  const [affichage, setAffichage] = useState();
  const [notif, setNotif] = useState([]);
  let navigate = useNavigate();

  const logout = useCallback(() => {
   
        localStorage.removeItem("ssid");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        navigate("/login");
     
  }, [navigate]);

  useEffect(() => {
    if (token) {
      setAffichage(
        <>
          <button className="btn logout" onClick={logout}>
            Se deconnecter
          </button>
        </>
      );
    }
  }, [token, username, logout]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/admin/commande")
      .then((res) => {
        setNotif(res.data.notif);
      })
      .catch((er) => console.log(er));
  }, []);

  const popNotif = document.querySelector(".notif");
  const notification = document.querySelector(".notification");

  function clickBell() {
    if (popNotif.style.display === "none") {
      popNotif.style.display = "block";
      notification.style.color = "black"
    } else {
      popNotif.style.display = "none";
    }
  }

  return (
      <div className="col-lg-12 g-0 nav-admin">
        {affichage}
        <i className="fa fa-bell-o notification" onClick={clickBell} style={{color : "black"}}></i>
        <div className="notif">
          {notif.map((value, index) => (
            <div key={index} className='notif-commande'>
              <span>{value.User.username} a fait un commande</span>
            </div>
          ))}
        </div>
      </div>
  );
}
