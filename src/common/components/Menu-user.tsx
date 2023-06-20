import { useEffect, useState } from "react";
import useAppCominicator from "../../../../sapiencia-core.front/src/common/hooks/app-communicator.hook";
import "../styles/sapiencia-header.scss";
import "../styles/sapiencia-menu-user.scss";
import logo from "../public/images/logo-sapiencia-horizontal.png";
import close from "../public/images/close.png";
import menu from "../public/images/x-blanca.png";


import "../components/header.scss";

export default function Menu({ handleUserMenu }) {
  return (
    <>
      <div className="content-menu-user">
        { <div className="content-cerrar">
          { <button className="button-header" onClick={handleUserMenu}>
            { <img src={menu} alt="Cerrar" /> }
          </button> }
        </div> }
        <div className="content-info-user">
          <p>
            <strong>Usuario Pruebas </strong>
          </p>
          <p> CC 1000625410 </p>
        </div>
        <div className="content-options-user">
          <div className="content-option">
            <a> Cambiar contraseña</a>
          </div>
          <div className="content-option">
            <a> Editar usuario </a>
          </div>
          <div className="content-option">
              <a> Cerrar Sesión</a>
          </div>
        </div>
        <div className="content-logos">
          <div className="content-foot">
              <img src={logo} alt="logo alcaldia" />
          </div>
         
        </div>
      </div>
    </>
  );
}
