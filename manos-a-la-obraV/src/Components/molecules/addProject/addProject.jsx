import React, { useState } from 'react';
const AddProjectForm = ({ onProjectAdded }) => {
    const [project, setProject] = useState({ name: "", description: "" });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProject((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const newProject = await fetch(
          "https://lamansysfaketaskmanagerapi.onrender.com/api/projects",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              auth: localStorage.getItem("token"),
            },
            body: JSON.stringify(project),
          }
        ).then((res) => res.json());
  
        onProjectAdded(newProject.data);
        setProject({ name: "", description: "" }); // Resetea el formulario
      } catch (err) {
        console.error("Error al agregar proyecto:", err);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="add-project-form">
        <label>
          Nombre del Proyecto:
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <button type="submit" className="add-project-button">
          Agregar Proyecto
        </button>
      </form>
    );
  };
  
  export default AddProjectForm;