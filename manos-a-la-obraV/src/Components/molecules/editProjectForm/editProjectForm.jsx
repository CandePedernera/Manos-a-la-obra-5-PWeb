import React, { useState, useEffect } from 'react';
import { updateProject } from '../../../utils/apiCalls';
import './styles.css';

const EditProjectForm = ({ project, onProjectUpdated }) => {
  const [name, setName] = useState(project.name || '');
  const [description, setDescription] = useState(project.description || '');

  useEffect(() => {
    // Prellenamos los campos con los valores iniciales
    setName(project.name || '');
    setDescription(project.description || '');
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProject = {
      name,
      description,
    };

    try {
      console.log("Actualizando proyecto:", updatedProject);
      const updated = await updateProject(project._id, updatedProject);
      console.log("Proyecto actualizado:", updated);
      onProjectUpdated(updated); // Asegúrate de que esto sea llamado correctamente
    } catch (error) {
      console.error("Error al actualizar el proyecto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-project-form">
      <div>
        <label htmlFor="name">Nombre del Proyecto</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Actualizar Proyecto</button>
    </form>
  );
};

export default EditProjectForm;
