import { useState, useEffect } from "react";
import React from "react";

function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://81.93.66.18:8234/api.cfc?method=gradovi_lista", {
      //   mode: "no-cors",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.gradovi);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const gradovi = items.DATA;

  //   console.log(gradovi);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {gradovi.map((item) => (
          <li key={item}>{item[1]}</li>
        ))}
      </ul>
    );
  }
}

export default MyComponent;
