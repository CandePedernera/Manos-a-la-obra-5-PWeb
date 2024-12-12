import React, { useState } from 'react'
import './StylesForm.css'
function CreateForm({title, initialData, fields, onSubmit}) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,  
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData(initialData);
  };

  return (
    <div className='contenedorForm'>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input className='inputform'
            type={field.type || 'text'} 
            name={field.name} 
            value={formData[field.name]} 
            onChange={handleChange}
            placeholder={field.placeholder || ''}
            />
          </div>
        ))}
        <button type='submit' className='agregarBoton'>Agregar</button>
  
      </form>
      
    </div>
  )
}

export default CreateForm;