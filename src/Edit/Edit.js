import React from "react";
import ReactDOM from "react-dom";

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const Edit = (props) => {
  return (
    <div className="div--backgorund_popup">
      <form>
        <div className="div--closeModal">
          <span className="span--x">X</span>
        </div>
        <div className="div--popup_modal">
          <h2>Uredi pacijenta</h2>
          <input
            placeholder="Ime pacijenta"
            className="input--ime_pacijenta_dodaj"
            type="text"
            defaultValue={props.nestoDrugo.ime}
          ></input>
          <input
            placeholder="Prezime pacijenta"
            className="input--prezime_pacijenta_dodaj"
            type="text"
            defaultValue={props.nestoDrugo.prezime}
          ></input>
          <input
            placeholder="JMBG pacijenta"
            className="input--jmbg_dodaj"
            type="number"
            defaultValue={props.nestoDrugo.jmbg}
          ></input>
          {/* <select className="select--select_button">
            {props.gradovi.map((grad) => {
              return (
                <option data-id={grad.id_grad} key={grad.id_grad}>
                  {grad.naziv}
                </option>
              );
            })}
          </select> */}
          <input defaultValue={props.nestoDrugo.grad}></input>

          <div className="div--buttons">
            <button className="button--dodaj" value="Dodaj">
              Dodaj
            </button>

            <button className="button--otkazi_edit">Otkazi</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const PopupEdit = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop></Backdrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <Edit nestoDrugo={props.podaci}></Edit>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default PopupEdit;
