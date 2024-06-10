import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const animals = ["dog", "cat", "bird", "elephant"];

const initialState = {
  fullName: '',
  address: '',
  animals: []
}

function App() {
  const [formValues, setFormValues] = useState(initialState);
  
  return (
    <>
      <input placeholder="Full Name" />
      <br />
      <input placeholder="Address" />
      <br />
      {animals.map((animal, index) => (
        <div key={index}>
          <input type="checkbox" /> {animal}
        </div>
      ))}
      <br />
      <button>Submit</button>
    </>
  );
}

export default App;
