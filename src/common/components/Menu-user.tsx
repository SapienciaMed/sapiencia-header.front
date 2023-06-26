import { useEffect, useState, useContext } from "react";
import useAppCominicator from "../../../../sapiencia-core.front/src/common/hooks/app-communicator.hook";
import "../styles/sapiencia-header.scss";
import "../styles/sapiencia-menu-user.scss";
import logo from "../public/images/logo-sapiencia-h.png";
import close from "../public/images/close.png";
import menu from "../public/images/x-blanca.png";
import { AppContext } from "../contexts/header.context";


import "../components/header.scss";
import { useNavigate } from "react-router-dom";

export default function Menu({ handleUserMenu }) {
  const { authorization,message,setMessage } = useContext(AppContext);
  const { publish, subscribe, unsubscribe } = useAppCominicator();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleCloseSession = () => {
    setMessage({
      title: "Cerrar Sesión",
      description: "¿Está Segur@ de cerrar sesión?",
      show: true,
      cancelTitle: "Cancelar",
      OkTitle: "Si,cerrar sesíon",
      onOk: () => {
        localStorage.removeItem("token");
        navigate("/login");
        setMessage((prev) => {return{...prev,show:false}});
      },
      onCancel: () => {
        setMessage({});
      },
      onClose: () => {
        setMessage({});
      }
    })
  };

 const handleChangePassword = () => {
    navigate("/change-password");
  }

  useEffect(() => {
    if(message) {
      console.log(message);
      publish("modalCloseSession", message)
    };
  }, [message])
  
  return (
    <>
      <div className="content-menu-user">
        {
          <div className="content-cerrar">
            {
              <button className="button-header" onClick={handleUserMenu}>
                {<img src={menu} alt="Cerrar" />}
              </button>
            }
          </div>
        }
        <div className="content-info-user">
          <p>
            <strong>
              {authorization?.user?.names} {authorization?.user?.lastNames}
            </strong>
          </p>
          <p>
            {authorization?.user?.typeDocument}
            {authorization?.user?.numberDocument}
          </p>
        </div>
        <div className="content-options-user">
          <div className="content-option">
            <p onClick={handleChangePassword}> Cambiar contraseña</p>
          </div>
          <div className="content-option">
            <p> Editar usuario </p>
          </div>
          <div className="content-option">
            <p onClick={handleCloseSession}>
              Cerrar Sesión
            </p>
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
