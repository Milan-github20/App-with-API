import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import "./popup.css";
import ReactDOM from "react-dom";

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const Modal = (props) => {
  const imeRef = useRef();
  const prezimeRef = useRef();
  const jmbgRef = useRef();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    jmbg: "",
    grad: "",
  });

  function submit(e) {
    e.preventDefault();

    if (
      imeRef.current.value.trim() === "" ||
      imeRef.current.value.trim() === null
    ) {
      return alert("Unesite ime pacijenta");
    } else if (
      imeRef.current.value.trim().length === 1 ||
      imeRef.current.value.trim().length === 2
    ) {
      return alert("Unesite 3 ili vise karaktera");
    } else if (
      prezimeRef.current.value.trim() === "" ||
      prezimeRef.current.value.trim() === null
    ) {
      return alert("Unesite prezime pacijenta");
    } else if (
      prezimeRef.current.value.trim().length === 1 ||
      prezimeRef.current.value.trim().length === 2
    ) {
      return alert("Unesite 3 ili vise karaktera");
    } else if (
      jmbgRef.current.value.trim() === "" ||
      jmbgRef.current.value.trim() === null
    ) {
      return alert("Unesite jmbg pacijenta");
    } else if (
      jmbgRef.current.value.trim().length >= 14 ||
      jmbgRef.current.value.trim().length <= 12
    ) {
      return alert("Unesite tacno 13 cifara");
    } else {
      const url = `http://172.18.1.73:8080/api3.cfc?method=pacijent_unos&ime=${
        imeRef.current.value
      }&prezime=${prezimeRef.current.value}&jmbg=${
        jmbgRef.current.value
      }&id_grad=${+data.grad}`;

      axios
        .post(url, {
          firstName: imeRef.current.value,
          lastName: prezimeRef.current.value,
          jmbg: jmbgRef.current.value,
          grad: +data.grad,
        })
        .then((res) => {
          console.log(res.data);
          alert("Uspjesno ste unijeli pacijenta!");
          imeRef.current.value = "";
          prezimeRef.current.value = "";
          jmbgRef.current.value = "";
          props.onClose(false);
        });
    }
  }

  function handle(e) {
    const index = e.target.children[e.target.selectedIndex].dataset.id;
    const newdata = { ...data, grad: index };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    <div className="div--backgorund_popup">
      <form onSubmit={(e) => submit(e)}>
        <div className="div--closeModal">
          <span onClick={() => props.onClose(false)} className="span--x">
            X
          </span>
        </div>
        <div className="div--popup_modal">
          <h2>Dodaj pacijenta</h2>
          <input
            placeholder="Ime pacijenta"
            className="input--ime_pacijenta_dodaj"
            ref={imeRef}
            type="text"
          ></input>
          <input
            placeholder="Prezime pacijenta"
            className="input--prezime_pacijenta_dodaj"
            ref={prezimeRef}
            type="text"
          ></input>
          <input
            placeholder="JMBG pacijenta"
            className="input--jmbg_dodaj"
            ref={jmbgRef}
            type="number"
          ></input>
          <select onChange={handle} className="select--select_button">
            {props.gradovi.map((grad) => {
              return (
                <option data-id={grad.id_grad} key={grad.id_grad}>
                  {grad.naziv}
                </option>
              );
            })}
          </select>
          <div className="div--buttons">
            <button className="button--dodaj" value="Dodaj">
              Dodaj
            </button>

            <button
              onClick={() => props.onClose(false)}
              className="button--otkazi"
            >
              Otkazi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const Popup = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop></Backdrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <Modal gradovi={props.gradovi} onClose={props.closeModal}></Modal>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Popup;
