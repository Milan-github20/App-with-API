import { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./edit.css";

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const Edit = (props) => {
  const imeRef = useRef();
  const prezimeRef = useRef();
  const jmbgRef = useRef();
  const gradRef = useRef();

  const [data, setData] = useState({
    grad: "",
  });

  const [items, setItems] = useState([]);
  console.log(items);

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

  function submit(e) {
    e.preventDefault();
    props.getJmbg(jmbgRef.current.value);
    if (
      imeRef.current.value.trim() === "" ||
      imeRef.current.value.trim() === null
    ) {
      return alert("Morate unijeti ime pacijenta! ");
    }
    if (imeRef.current.value.trim().length <= 2) {
      return alert("Morate unijeti više od dva karaktera!");
    }
    if (
      prezimeRef.current.value.trim() === "" ||
      prezimeRef.current.value.trim() === null
    ) {
      return alert("Morate unijeti prezime pacijenta!");
    }
    if (prezimeRef.current.value.trim().length <= 2) {
      return alert("Morate unijeti više od dva karaktera!");
    }
    if (
      jmbgRef.current.value.trim() === "" ||
      jmbgRef.current.value.trim() === null
    ) {
      return alert("Morate unijeti matični broj pacijenta!");
    }
    if (
      jmbgRef.current.value.trim().length <= 12 ||
      jmbgRef.current.value.trim().length >= 14
    ) {
      return alert("Morate unijeti tačno 13 karaktera!");
    }

    console.log(imeRef.current.value);
    console.log(prezimeRef.current.value);
    console.log(jmbgRef.current.value);
    const url = `http://172.18.1.73:8080/api3.cfc?method=pacijent_unos&ime=${
      imeRef.current.value
    }&prezime=${prezimeRef.current.value}&jmbg=${
      jmbgRef.current.value
    }&id_grad=${data.grad ? +data.grad : gradRef.current.dataset.id}&id=${
      props.nestoDrugo.id
    }`;

    axios
      .post(url, {
        ime: imeRef.current.value,
        prezime: prezimeRef.current.value,
        jmbg: jmbgRef.current.value,
        id_grad: +data.grad,
      })
      .then((res) => {
        alert("Uspješno ste napravili izmjene!");
        props.onClose(false);
      });
  }

  console.log(props.nestoDrugo.id_grad);

  function handle(e) {
    const index = e.target.children[e.target.selectedIndex].dataset.id;
    const newdata = { grad: index };
    console.log(newdata);
    setData(newdata);
  }
  return (
    <div className="div--backgorund_popup_uredi">
      <form onSubmit={(e) => submit(e)}>
        <div className="div--closeModal_uredi">
          <span className="span--x_uredi" onClick={() => props.onClose(false)}>
            ✖
          </span>
        </div>
        <div className="div--popup_modal_uredi">
          <h2>Uredi pacijenta</h2>

          <input
            className="input--ime_pacijenta_uredi"
            type="text"
            id="firstName"
            ref={imeRef}
            defaultValue={
              props.nestoDrugo.ime.charAt(0).toUpperCase() +
              props.nestoDrugo.ime.slice(1).toLowerCase()
            }
          />

          <input
            type="text"
            id="lastName"
            className="input--prezime_pacijenta_uredi"
            ref={prezimeRef}
            defaultValue={
              props.nestoDrugo.prezime.charAt(0).toUpperCase() +
              props.nestoDrugo.prezime.slice(1).toLowerCase()
            }
          />

          <input
            type="number"
            className="input--jmbg_uredi"
            id="jmbg"
            ref={jmbgRef}
            defaultValue={props.nestoDrugo.jmbg}
          />

          <select className="select--select_button_uredi" onChange={handle}>
            <option data-id={props.nestoDrugo.id_grad} ref={gradRef}>
              {props.nestoDrugo.grad}
            </option>
            {items.map((item) => (
              <option data-id={item.id_grad} ref={data}>
                {item.naziv}
              </option>
            ))}
          </select>
          <div className="div--buttons_uredi">
            <input type="submit" className="button--uredi" value="Uredi" />
            <input
              type="button"
              className="button--otkazi_uredi"
              onClick={() => props.onClose(false)}
              value="Otkaži"
            />
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
        <Edit
          getJmbg={props.getJmbg}
          nestoDrugo={props.podaci}
          onClose={props.uredi}
        ></Edit>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default PopupEdit;
