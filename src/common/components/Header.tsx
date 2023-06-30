import { useEffect, useState, useContext } from "react";
import useAppCominicator from "../hooks/app-communicator.hook";
import UserMenu from "../components/Menu-user";
import "../styles/sapiencia-menu-user.scss";
import "../styles/sapiencia-header.scss";
import sapienciaLogo from "../public/images/sapiencia-1.png";
import iconUser from "../public/images/ico-user.png";
import iconCampana from "../public/images/icon-notif.png";
import iconUserWh from "../public/images/ico-user-wh.png";
import navMovil from "../public/images/nav-mob.png";
import logoAlcaldia from "../public/images/logo-sapiencia-horizontal.png";
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
  const { authorization , setAuthorization } = useContext(AppContext);


  const handleSidebar = () => {
    publish("sidebar", true);
  };

  const [showDiv, setShowDiv] = useState(false);

  const handleUserMenu = () => {
    setShowDiv(!showDiv);
  };

  
  // Effect que verifca el token y solicita la autorizacion
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   } else {
  //     getAuthorization(token)
  //       .then((res) => {
  //         if (res.operation.code != EResponseCodes.OK) {
  //           localStorage.removeItem("token");
  //           navigate("/login");
  //         }else{
  //           setAuthorization(res.data); 
  //         }
  //       })
  //       .catch(() => {});
  //   }
  // }, []);


  return (
    <>
    {showDiv && <UserMenu handleUserMenu={handleUserMenu} ></UserMenu>}
      <header className="container-grid_header">
        <div className="content-logo_sapiencia">
        </div>
        <div className="content-options_user">
          <p>
            Hola, <strong>{authorization?.user?.names} {authorization?.user?.lastNames}</strong>
          </p>
          <div className="content-notifications">
            <button className="button-header">
              <img src={iconCampana} className="sapiencia-iconCampana" />
            </button>
            <span>+99</span>
          </div>
          <button className="button-header" onClick={handleUserMenu}>
            <img src={iconUser} className="sapiencia-iconUser"  />
          </button>
        </div>
      </header>

      <header className="container-grid_headerM">
       
          <button className="button-header" onClick={handleSidebar}>
            <img src={navMovil} alt="menu" />
          </button>
     
          <img src={logoAlcaldia} alt="Alcaldia" />

          <button className="button-header" onClick={handleUserMenu}>
            <img src={iconUserWh} alt="usuario" />
          </button>
      </header>
    </>
  );
}
