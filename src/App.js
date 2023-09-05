import { useState, useEffect } from "react";

export default function App() {
  ///////////////////////////////////////////////////
  //////////            STATES            //////////
  //////////////////////////////////////////////////
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false); // - this is just for loading purposes (disables the input and select fields) and prevent to print undefined while fetch is processing

  //useEffect once the page loads, with try and catch method
  useEffect(() => {
    async function convert() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();

        //data.rates[toCur] - gets the data obj from the fetch statement - accessed the rates and passed as an array {toCur} - is depending on the currency that the user wants to convert
        setConverted(data.rates[toCur]);
        setIsLoading(false);
      } catch (err) {
        console.log("ERROR" + err);
      }
    }

    //to check if user logs the same currency it will just print the {amount} that the user putted in the input field
    if (fromCur === toCur) {
      setConverted(amount);
    } else {
      convert();
    }

    //useState dependencies whenever the state updates this useEffect will re-render
  }, [amount, fromCur, toCur]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {converted} {toCur}
      </p>
    </div>
  );
}
