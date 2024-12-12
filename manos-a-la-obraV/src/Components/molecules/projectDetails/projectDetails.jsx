import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectDetails.css'
import { deleteEpic, createEpic, updateEpic } from '../../../utils/apiCalls'; // Asegúrate de importar la función de creación de épicas
import { useState } from 'react';

const ProjectDetailsComponent = ({ projects, epics }) => {
  const [epicList, setEpicList] = useState(epics);
  const [showForm, setShowForm] = useState(false);
  const [newEpicName, setNewEpicName] = useState('');
  const [newEpicDescription, setNewEpicDescription] = useState('');
  const [editEpicId, setEditEpicId] = useState(null);
  const [editEpicName, setEditEpicName] = useState('');
  const [editEpicDescription, setEditEpicDescription] = useState('');


  //ELIMINO EPICAS
  const handleDeleteEpic = async (epicId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta épica?');
    if (!confirmDelete) return;

    try {
      await deleteEpic(epicId); // Llama a la función para eliminar la épica
      setEpicList((prevEpics) => prevEpics.filter((epic) => epic._id !== epicId)); // Actualiza la lista local
      alert('Épica eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar épica:', error);
      alert(`Error al eliminar la épica: ${error.message}`);
    }
  };

  const handleAddEpic = async () => {
    // Supongamos que newEpicName y newEpicDescription se obtienen de un formulario o estado
    const newEpicName = 'Nueva Épica'; // Puedes reemplazar esto por un estado o valor dinámico
    const newEpicDescription = 'Descripción de la nueva épica';
  
    // Verifica que el ID del proyecto exista
    if (!projects._id) {
      alert('Error: No se pudo determinar el ID del proyecto.');
      return;
    }
  
    // Construimos el objeto epicData
    const epicData = {
      name: newEpicName,
      description: newEpicDescription,
      project: projects._id, // Usamos el ID del proyecto actual
    };
  
    try {
      // Llamamos a createEpic con los datos de la épica
      const newEpic = await createEpic(epicData);
  
      // Actualizamos la lista de épicas en el estado
      setEpicList((prevEpics) => [...prevEpics, newEpic]);
  
      alert('Épica creada con éxito');
    } catch (error) {
      console.error('Error al crear épica:', error);
      alert(`Error al crear la épica: ${error.message}`);
    }
  };
  
  const handleEditEpic = async () => {
    if (!editEpicName || !editEpicDescription) {
      alert('Por favor completa todos los campos.');
      return;
    }
  
    try {
      const updatedEpic = await updateEpic(editEpicId, {
        name: editEpicName,
        description: editEpicDescription,
      });
  
      setEpicList((prevEpics) =>
        prevEpics.map((epic) =>
          epic._id === editEpicId ? { ...epic, ...updatedEpic } : epic
        )
      );
  
      alert('Épica actualizada con éxito');
      setEditEpicId(null);
      setEditEpicName('');
      setEditEpicDescription('');
    } catch (error) {
      console.error('Error al actualizar épica:', error);
      alert(`Error al actualizar épica: ${error.message}`);
    }
  };
  


  return (
    <div className="project-details-wrapper">
      <div className="project-info">
        <h1 className="project-name">{projects.name}</h1>
        
        <p className="project-description">{projects.description}</p>
        <h2 className="epics-title">Epicas</h2>
        <ul className="epics-list">
          {epics.map((epics) => (
            <li key={epics._id} className="epic-item">
             {editEpicId === epics._id ? (
                <div>
                  <input 
                    type="text"
                    value={editEpicName}
                    onChange={(e) => setEditEpicName(e.target.value)}
                    placeholder="Nuevo nombre"
                    className="edit-epic-input"
                  />
                  <textarea
                    value={editEpicDescription}
                    onChange={(e) => setEditEpicDescription(e.target.value)}
                    placeholder="Nueva descripción"
                     className="edit-epic-textarea"
                  />
                  <div className="edit-epic-buttons">
                  <button onClick={handleEditEpic} className="submit-epic-button">Guardar</button>
                  <button onClick={() => setEditEpicId(null) } className="cancel-epic-button">Cancelar</button>
                  </div>
                  
                </div>
              ) : (
                <div>
                  <Link to={`/epics/${epics._id}/stories`} className="epic-link">
                    {epics.name}
                  </Link>
                  {/* Botón para eliminar épica */}
                  <button onClick={() => handleDeleteEpic(epics._id)} className="delete-epic-button">
                    Eliminar
                  </button>
                  {/* Botón para editar épica */}
                  <button
                    onClick={() => {
                      setEditEpicId(epics._id);
                      setEditEpicName(epics.name);
                      setEditEpicDescription(epics.description);
                    }}
                    
                    className="edit-epic-button"
                  >
                    Editar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <button onClick={() => setShowForm(!showForm)} className="boton">
          {showForm ? 'Cancelar' : 'Agregar Épica'}
        </button>
        <button className='add-project-button' onClick={() => window.location.reload(false)}>Haz click para ver tus cambios</button>
        {showForm && (
          <form onSubmit={handleAddEpic} className="add-epic-form">
            <input
              type="text"
              placeholder="Nombre de la épica"
              value={newEpicName}
              onChange={(e) => setNewEpicName(e.target.value)}
              required
            />
            <textarea
              placeholder="Descripción de la épica"
              value={newEpicDescription}
              onChange={(e) => setNewEpicDescription(e.target.value)}
              required
            />
            <button type="submit" className="submit-epic-button">
              Crear Épica
            </button>
          </form>
        )}
        
      </div>
    </div>
  );
};

export default ProjectDetailsComponent;