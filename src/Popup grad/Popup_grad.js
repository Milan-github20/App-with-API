import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import "./popup_grad.css";
import ReactDom from "react-dom";

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const Modal = (props) => {
  const gradRef = useRef();

  const [dataGrad, setDataGrad] = useState({
    grad: "",
  });

  const submitGrad = (e) => {
    e.preventDefault();
    if (
      gradRef.current.value.trim() === "" ||
      gradRef.current.value.trim() === null
    ) {
      return alert("Unesite naziv grada");
    } else if (
      gradRef.current.value.trim().length === 1 ||
      gradRef.current.value.trim().length === 2
    ) {
      return alert("Unesite 3 ili vise karaktera");
    } else {
      const urlGrad = `http://81.93.66.18:8234/api3.cfc?method=gradovi_unos&naziv=${gradRef.current.value}`;
      axios
        .post(urlGrad, {
          grad: gradRef.current.value,
        })
        .then((res) => {
          console.log(res.dataGrad);
          alert("Uspjesno ste unijeli grad!");
          gradRef.current.value = "";
          props.onClose(false);
        });
    }
  };

  function handleGrad(e) {
    const newdata = { ...dataGrad };
    newdata[e.target.id] = e.target.value;
    setDataGrad(newdata);
  }

  return (
    <div className="div--backgorund_popup_grad">
      <form onSubmit={(e) => submitGrad(e)}>
        <div className="div--closeModal">
          <span onClick={() => props.onClose(false)} className="span--x">
            X
          </span>
        </div>
        <div className="div--popup_modal_grad">
          <h2>Dodaj Grad</h2>
          <input
            placeholder="Ime grada"
            className="input--dodaj_ime_grada"
            onChange={(e) => handleGrad(e)}
            ref={gradRef}
            type="text"
          ></input>

          <div className="div--buttons_grad">
            <button className="button--dodaj_grad" value="Dodaj_grad">
              Dodaj
            </button>

            <button
              onClick={() => props.onClose(false)}
              className="button--otkazi_grad"
            >
              Otkazi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const PopupGradovi = ({ closeModalGrad }) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop></Backdrop>,
        document.getElementById("modal")
      )}
      {ReactDom.createPortal(
        <Modal onClose={closeModalGrad}></Modal>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default PopupGradovi;
