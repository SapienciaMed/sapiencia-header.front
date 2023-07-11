import { useEffect, useState, useContext } from "react";
import useAppCominicator from "../hooks/app-communicator.hook";
import UserMenu from "../components/Menu-user";
import "../components/header.scss";
import "../styles/sapiencia-menu-user.scss";
import "../styles/sapiencia-header.scss";
import iconUser from "../public/images/ico-user-533893.png";
import iconCampana from "../public/images/icon-notif-533893.png";
import iconUserBL from "../public/images/ico-user-67C6DD.png";
import navMovil from "../public/images/nav-mob-67C6DD.png";
import logoSapienciaAlcaldiaBlanco from "../public/images/logo-sapiencia-alcaldia-blanco.png";
import iconoAurora from '../public/images/aurora-color.png'
import "../components/header.scss";
import useAuthService from "../hooks/auth-service.hook";
import { EResponseCodes } from "../constants/api.enum";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/header.context";

export default function Header() {
  // Servicios
  const navigate = useNavigate();
  const { publish } = useAppCominicator();
  const { getAuthorization } = useAuthService();
  const { authorization, setAuthorization } = useContext(AppContext);

  const handleSidebar = () => {
    publish("sidebar", true);
  };

  const [showDiv, setShowDiv] = useState(false);

  const handleUserMenu = () => {
    setShowDiv(!showDiv);
  };

  //Effect que verifca el token y solicita la autorizacion
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getAuthorization(token)
        .then((res) => {
          if (res.operation.code != EResponseCodes.OK) {
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            setAuthorization(res.data);
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <>
      {showDiv && <UserMenu handleUserMenu={handleUserMenu}></UserMenu>}
      <header className="container-grid_header">
        <div className="content-logo-aurora">
          <img src={iconoAurora} alt="aurora"/>
        </div>
        <div className="content-options_user">
          <p>
            Hola,{" "}
            <strong>
              {authorization?.user?.names} {authorization?.user?.lastNames}
            </strong>
          </p>
          <div className="content-notifications">
            <button className="button-header">
              <img src={iconCampana} className="sapiencia-iconCampana" />
            </button>
            <span>+99</span>
          </div>
          <button className="button-header" onClick={handleUserMenu}>
            <img src={iconUser} className="sapiencia-iconUser" />
          </button>
        </div>
      </header>

      <header className="container-grid_headerM">
       
        <button className="button-header" onClick={handleSidebar}>
          <img src={navMovil} alt="menu" />
        </button>

        <img className="log-alcaldia" src={logoSapienciaAlcaldiaBlanco} alt="Alcaldia" />
      
        <button className="button-header" onClick={handleUserMenu}>
          <img src={iconUserBL} alt="usuario" />
        </button>
      </header>
    </>
  );
}
