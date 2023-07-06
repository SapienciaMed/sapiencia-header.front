import { useEffect, useState, useContext } from "react";
import useAppCominicator from "../hooks/app-communicator.hook";
import UserMenu from "../components/Menu-user";
import "../styles/sapiencia-menu-user.scss";
import "../styles/sapiencia-header.scss";
import {BiSolidUser } from "react-icons/bi"
import {BsBellFill} from "react-icons/bs"
import {GiHamburgerMenu} from "react-icons/gi"
import logoAlcaldia from "../public/images/logo-sapiencia-horizontal.png";
import "../components/header.scss";
import useAuthService from "../hooks/auth-service.hook";
import { EResponseCodes } from "../constants/api.enum";
import { useNavigate,useLocation,useMatches } from "react-router-dom";
import { AppContext } from "../contexts/header.context";
import { BreadCrumb } from 'primereact/breadcrumb';

export default function Header() {
  // Servicios
  const navigate = useNavigate();
  const { publish } = useAppCominicator();
  const { getAuthorization } = useAuthService();
  const { authorization , setAuthorization } = useContext(AppContext);
 // const matches = useMatches();

  let location = useLocation();

  //console.log(location);

  // const breadcrumbItems = location.pathname.split("/").map((path) => {
  //   return {
  //     label : path,
  //     url: "/" + ,
  //   };
  // });

  // const breadcrumbItems = location.pathname.split('/').map((path, index, array) => {
  //   const url = array.slice(0, index + 1).join('/'); // Construir la URL concatenando los segmentos de la ruta

  //   return {
  //     label: path,
  //     url: url, // Asignar la URL correspondiente
  //   };
  // });

  // console.log(breadcrumbItems);

  const handleSidebar = () => {
    publish("sidebar", true);
  };

  const [showDiv, setShowDiv] = useState(false);

  const handleUserMenu = () => {
    setShowDiv(!showDiv);
  };

  
  // Effect que verifca el token y solicita la autorizacion
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
          }else{
            setAuthorization(res.data); 
          }
        })
        .catch(() => {});
    }
  }, []);


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
              {<BsBellFill size={32} color="533893" />}
            </button>
            <span>+99</span>
          </div>
          <button className="button-header" onClick={handleUserMenu}>
              {<BiSolidUser size={32} color="#533893" />}
          </button>
        </div>
      </header>

      <header className="container-grid_headerM">
       
          <button className="button-header" onClick={handleSidebar}>
              {<GiHamburgerMenu size={32} color="#67C6DD" />} 
          </button>
            <img src={logoAlcaldia} alt="Alcaldia" onClick={() => {navigate('/')}} />
          <button className="button-header" onClick={handleUserMenu}>
              {<BiSolidUser size={32} color="#67C6DD" />}
          </button>
      </header>
      {/* <div>
      <BreadCrumb model={breadcrumbItems} />
      </div> */}
    </>
  );
}
