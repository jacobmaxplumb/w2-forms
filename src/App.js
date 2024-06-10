import "./App.css";
import { useState } from "react";

const animals = ["dog", "cat", "bird", "elephant"];

const initialState = {
  fullName: '',
  address: '',
  animals: ['dog']
}

function App() {
  const [formValues, setFormValues] = useState(initialState);

  const handleTextChange = (e) => {
    const {value, id} = e.target;
    setFormValues({...formValues, [id]: value})
  }

  const handleCheckboxChange = (e) => {
    const {name, checked} = e.target;
    if (checked) {
      const animals = [...formValues.animals, name];
      setFormValues({...formValues, animals: animals});
    } else {
      const animals = formValues.animals.filter(animal => animal !== name);
      setFormValues({...formValues, animals: animals});
    }
  }
  
  return (
    <>
      <input onChange={handleTextChange} id='fullName' placeholder="Full Name" value={formValues.fullName} />
      <br />
      <input onChange={handleTextChange} id='address' placeholder="Address" value={formValues.address} />
      <br />
      {animals.map((animal, index) => (
        <div key={index}>
          <input name={animal} onChange={handleCheckboxChange} type="checkbox" checked={formValues.animals.includes(animal)} /> {animal}
        </div>
      ))}
      <br />
      <button>Submit</button>
    </>
  );
}

export default App;
