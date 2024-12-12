import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './StylesEpic.css'
import DeleteButton from '../deleteHistorias/index';
import CreateForm from '../FormTasks/CreateForm';
import { addStoryToEpic } from '../../../utils/apiCalls';
import EditStoryForm from '../editHistoria/index'

const EpicsAndStories = ({ epics, stories }) => {
  const [showForm, setShowForm] = useState(false);
  const [editStoryId, setEditStoryId] = useState(null);
  const [updatedStories, setUpdatedStories] = useState(stories);

  const handleAddStory = async (storyData) => {
    try {
      // Llamada a la API para agregar la historia
      const newStory = await addStoryToEpic(storyData);
      alert('Historia agregada exitosamente');
      setShowForm(false); // Oculta el formulario después de agregar la historia

      // Actualiza el estado de las historias en el componente principal
      updateStories((prevStories) => [...prevStories, newStory]); // Añade la nueva historia al estado de historias
    } catch (err) {
      console.error('No se pudo agregar la historia', err);
      alert('Error al agregar la historia');
    }
  };
  // Función para manejar la edición
  const handleEditClick = (storyId) => {
    console.log(`Editando historia con ID: ${storyId}`); // Asegúrate de que storyId sea válido
    setEditStoryId(storyId);
  };

  // Función para cerrar el formulario de edición
  const handleCloseEditForm = () => {
    setEditStoryId(null); // Cierra el formulario de edición
  };

  return (
    <div className="epica-container">
      <h1 className="epica-title">{epics.name}</h1>

      <p className="epica-description">{epics.description}</p>

      <h2 className="epics-subtitle">Historias</h2>
      <ul className="epics-list">
        {stories.map((story) => (
          <li key={story._id} className="epic-story-item">
            <Link
              to={`/stories/${story._id}/tasks`}
              className="epic-story-link"
            >
              <div className="story-info">
                <span className="story-name">{story.name}</span>
                <h3></h3>
                <span className="story-description">{story.description}</span>
              </div>
            </Link>

            <DeleteButton className='agregarHistoria'
              storyId={story._id}  // Pasamos el ID de la historia a DeleteButton
              updateState={() => updateStories(stories.filter(s => s._id !== story._id))}  // Actualiza la lista de historias eliminando la historia eliminada
            />
            <button onClick={() => handleEditClick(story._id)} className='agregarHistoria'>Editar</button>

            {/* Formulario de edición de historia */}
            {editStoryId === story._id && (
              <EditStoryForm
                storyId={editStoryId}
                closeForm={handleCloseEditForm}
                updateState={setUpdatedStories} // Actualiza el estado de las historias
              />
            )}

          </li>
        ))}
      </ul>

      {/* Botón para mostrar el formulario de agregar historia */}
      <button className="agregarHistoria" onClick={() => setShowForm(true)}>
        Agregar Historia
      </button>
      <button className='add-project-button' onClick={() => window.location.reload(false)}>Haz click para ver tus cambios</button>
      {/* Formulario para agregar historia */}
      {/* Formulario para agregar historia */}
      {showForm && (
        <CreateForm
          title="Agregar Historia"
          initialData={{
            name: '',
            description: '',
            epic: epics._id, // Asocia la historia con la épica
          }}
          fields={[
            { name: 'name', label: 'Nombre' },
            { name: 'description', label: 'Descripción' },
          ]}
          onSubmit={handleAddStory} // Asegúrate de pasar handleAddStory aquí
        />

      )}

{/* Formulario para editar historia */}
{editStoryId && (
        <EditStoryForm 
          storyId={editStoryId} 
          closeForm={handleCloseEditForm} 
          updateState={setUpdatedStories} // Asegúrate de pasar la función correcta para actualizar el estado
        />
      )}

    </div>
  );
};

export default EpicsAndStories;