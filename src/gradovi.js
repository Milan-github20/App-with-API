import { useState, useEffect } from "react";
import React from "react";
import Pacijenti from "./pacijenti";

function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [grad, setGrad] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://81.93.66.18:8234/api.cfc?method=gradovi_lista")
      .then((res) => res.json())
      .then(
        (grad) => {
          setIsLoaded(true);
          setGrad(grad.gradovi);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const gradovi = grad.DATA;

  //   console.log(gradovi);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <ul>
          {gradovi.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Pacijenti />
      </div>
    );
  }
}

export default MyComponent;
