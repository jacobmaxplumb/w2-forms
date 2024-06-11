import "./App.css";
import { useState } from "react";
import * as yup from 'yup';

const animals = ["dog", "cat", "bird", "elephant"];

const initialState = {
  fullName: '',
  address: '',
  animals: []
}

const schema = yup.object().shape({
  fullName: yup.string().required('full name is required').min(3, 'full name must be at least 3 characters'),
  address: yup.string().required('address is required').min(3, 'address must be at least 3 characters'),
  animals: yup.array()
  .of(yup.string().oneOf(["dog", "cat", "bird", "elephant"], 'Animal must be one of the following: dog, cat, bird, elephant'))
  .required('Animals array is required')
  .min(1, 'At least one animal is required'),
})

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
