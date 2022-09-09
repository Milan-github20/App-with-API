import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Pacijenti from "./Pacijenti/pacijenti";
import PopupGradovi from "./Popup grad/Popup_grad";
import Popup from "./Popup/Popup-modal";
import "./style.css";

const Main = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalGrad, setOpenModalGrad] = useState(false);
  const [value, setValue] = useState("");
  const [ucitavanje, setUcitavanje] = useState(false);
  const [pacijenti, setPacijenti] = useState([]);
  const [items, setItems] = useState([]);
  const fetchGradovi = async () => {
    const response = await fetch(
      "http://172.18.1.73:8080/api3.cfc?method=gradovi_lista"
    );
    const data = await response.json();

    const transformedData = data.gradovi.DATA.map((item) => {
      return {
        id_grad: item[0],
        naziv: item[1],
      };
    });
    setItems(transformedData);
  };

  useEffect(() => {
    fetchGradovi();
  }, []);

  const getJmbg = (jmbg) => {
    return setTimeout(() => {
      axios
        .get(
          `http://172.18.1.73:8080/api3.cfc?method=pacijent_trazi&jmbg=${jmbg}`
        )
        .then((response) => {
          const transformedData = response.data.lista_pacijenata.DATA.map(
            (item) => {
              let helper = items.findIndex((grad) => grad.id_grad === item[4]);
              return {
                id: item[0],
                prezime: item[1],
                ime: item[2],
                jmbg: item[3],
                grad: helper !== -1 ? items[helper].naziv : "",
              };
            }
          );
          setPacijenti(transformedData);

          setUcitavanje(true);
        })
        .catch((err) => console.log(err));
    }, 1000);
  };

  const searchSum = (e) => {
    e.preventDefault();
    if (value.trim() === "" || value.trim() === null) {
      return alert("Polje ne smije biti prazno");
    }
    if (isNaN(value.trim())) {
      if (value.trim().length === 1 || value.trim().length === 2) {
        return alert("Unesi 3 ili vise karaktera");
      } else {
        return axios
          .get(
            `http://172.18.1.73:8080/api3.cfc?method=pacijent_trazi&ime=${value.trim()}`
          )
          .then((response) => {
            const transformedData = response.data.lista_pacijenata.DATA.map(
              (item) => {
                let helper = items.findIndex(
                  (grad) => grad.id_grad === item[4]
                );
                return {
                  id: item[0],
                  prezime: item[1],
                  ime: item[2],
                  jmbg: item[3],
                  grad: helper !== -1 ? items[helper].naziv : "",
                };
              }
            );
            setPacijenti(transformedData);
            setUcitavanje(true);
          })
          .catch((err) => console.log(err));
      }
    } else {
      if (value.trim() === "" || value.trim() === null) {
        return alert("Polje ne smije biti prazno");
      } else if (value.trim().length === 1 || value.trim().length === 2) {
        return alert("Unesi 3 ili vise karaktera");
      }

      return axios
        .get(
          `http://172.18.1.73:8080/api3.cfc?method=pacijent_trazi&jmbg=${value.trim()}`
        )
        .then((response) => {
          const transformedData = response.data.lista_pacijenata.DATA.map(
            (item) => {
              let helper = items.findIndex((grad) => grad.id_grad === item[4]);
              return {
                id: item[0],
                prezime: item[1],
                ime: item[2],
                jmbg: item[3],
                grad: helper !== -1 ? items[helper].naziv : "",
              };
            }
          );
          setPacijenti(transformedData);

          setUcitavanje(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="div--pocetni_input">
        <form onSubmit={searchSum}>
          <input
            placeholder="Pretrazi pacijenta..."
            className="input--pretrazi_pacijenta"
            onChange={(e) => setValue(e.target.value)}
          ></input>
        </form>
        <div className="div--buttoni">
          <form onSubmit={searchSum}>
            <button className="button--listing_pacijenata">Trazi</button>
          </form>
          <button
            className="button--dodaj_pacijenta"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Dodaj pacijenta
          </button>
          <button
            className="button--dodaj_grad_main"
            onClick={() => {
              setOpenModalGrad(true);
            }}
          >
            Dodaj Grad
          </button>
        </div>
      </div>
      <div className="div--popup">
        {openModal && (
          <Popup getJmbg={getJmbg} gradovi={items} closeModal={setOpenModal} />
        )}
      </div>
      <div className="div--popup">
        {openModalGrad && <PopupGradovi closeModalGrad={setOpenModalGrad} />}
      </div>
      {ucitavanje && <Pacijenti getJmbg={getJmbg} pacijenti={pacijenti} />}
    </div>
  );
};

export default Main;
