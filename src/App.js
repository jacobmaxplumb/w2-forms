import "./App.css";
import { useEffect, useState } from "react";
import * as yup from 'yup';

const animals = ["dog", "cat", "bird", "elephant"];

const initialState = {
  fullName: '',
  address: '',
  animals: []
}

const initialErrors = {
  fullName: '',
  address: '',
  animals: ''
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
  const [isDisabled, setIsDisable] = useState(true);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setIsDisable(!valid);
    })
    yup.reach(schema, 'animals').validate(formValues.animals).then(() => {
      setErrors({...errors, animals: ''})
    }).catch((error) => {
      setErrors({...errors, animals: error.errors[0]})
    })
  }, [formValues])

  const handleTextChange = (e) => {
    const {value, id} = e.target;
    setFormValues({...formValues, [id]: value})
    yup.reach(schema, id).validate(value).then(() => {
      setErrors({...errors, [id]: ''})
    }).catch((error) => {
      setErrors({...errors, [id]: error.errors[0]})
    });
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
      {errors.fullName && <div>{errors.fullName}</div>}
      <br />
      <input onChange={handleTextChange} id='address' placeholder="Address" value={formValues.address} />
      {errors.address && <div>{errors.address}</div>}
      <br />
      {animals.map((animal, index) => (
        <div key={index}>
          <input name={animal} onChange={handleCheckboxChange} type="checkbox" checked={formValues.animals.includes(animal)} /> {animal}
        </div>
      ))}
      {errors.animals && <div>{errors.animals}</div>}
      <br />
      <button disabled={isDisabled}>Submit</button>
    </>
  );
}

export default App;
