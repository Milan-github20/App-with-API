import { useState, useEffect } from "react";
import React from "react";

function Pacijenti() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://81.93.66.18:8234/api.cfc?method=pacijent_trazi&id=200")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.lista_pacijenata);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const pacijenti = items.DATA;

  if (error) {
    return <div>Greška: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Učitavanje...</div>;
  } else {
    return (
      <ul>
        {pacijenti.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
}

export default Pacijenti;
