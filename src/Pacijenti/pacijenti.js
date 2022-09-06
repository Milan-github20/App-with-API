import React, { useState } from "react";
// import Gradovi from "../Gradovi/gradovi";
import axios from "axios";
import "./pacijenti.css";
import PopupEdit from "../Edit/Edit";

function Pacijenti(props) {
  const [edit, setEdit] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [uredi, setUredi] = useState(false);

  const editPacijenta = (id, ime, prezime, jmbg, grad) => {
    const data = {
      id: id,
      ime: ime,
      prezime: prezime,
      jmbg: jmbg,
      grad: grad,
    };

    setEdit(data);
    setIsEditing(true);
  };

  function deleteItem(id, e) {
    e.preventDefault();
    if (window.confirm("Da li ste sigurni da zelite obrisati pacijenta?")) {
      e.target.parentElement.parentElement.remove();
      console.log(id);
      axios
        .post(
          `http://172.18.1.73:8080/api3.cfc?method=pacijent_obrisi&id=${id}`
        )
        .then((res) => {
          console.log(res.data);
          alert("Pacijent je obrisan!");
          console.log(props.pacijenti);
        });
    }
  }
  return (
    <>
      <table className="tabela--tabela_pacijenti">
        <tbody>
          <tr className="tr--header_tr">
            <th>JMBG</th>
            <th>IME</th>
            <th>PREZIME</th>
            <th>GRAD</th>
            <th></th>
            <th></th>
          </tr>
          <hr className="hr--horizontalna_linija"></hr>
          {props.pacijenti.map((item) => (
            <tr key={item.id} className="tr--main_dio_tabele">
              <th>{item.jmbg}</th>
              <th>
                {item.ime.charAt(0).toUpperCase() +
                  item.ime.slice(1).toLowerCase()}
              </th>
              <th>
                {item.prezime.charAt(0).toUpperCase() +
                  item.prezime.slice(1).toLowerCase()}
              </th>
              <th>{item.grad}</th>
              <th>
                <button
                  className="th--button_1"
                  onClick={() => {
                    editPacijenta(
                      item.id,
                      item.ime,
                      item.prezime,
                      item.jmbg,
                      item.grad
                    );
                    setUredi(true);
                  }}
                >
                  Uredi
                </button>
              </th>
              <th>
                <button
                  onClick={(e) => deleteItem(item.id, e)}
                  className="th--button_2"
                >
                  Obrisi
                </button>
              </th>
            </tr>
          ))}
        </tbody>
        {uredi && isEditing && <PopupEdit podaci={edit} uredi={setUredi} />}
      </table>
    </>
  );
}

export default Pacijenti;
