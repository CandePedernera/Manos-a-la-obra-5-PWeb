import React, { useEffect, useState } from 'react';
import { updateStoryInEpic } from '../../../utils/apiCalls'; // Asegúrate de que esta función esté definida y probada
import './styles.css';

const EditStoryForm = ({ storyId, closeForm, updateState }) => {
  const [story, setStory] = useState({ name: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
        console.log(`Cargando historia con ID: ${storyId}`);
        try {
          const response = await fetch(
            `https://lamansysfaketaskmanagerapi.onrender.com/api/stories/${storyId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                auth: localStorage.getItem('token'), // Si necesitas un token de autenticación
              },
            }
          );
      
          if (!response.ok) {
            throw new Error(`Error al cargar la historia. Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log('Datos de la historia:', data); // Depurar datos recibidos
          setStory(data.data || data); // Ajusta según el formato de respuesta de tu API
        } catch (err) {
          console.error('Error en fetchStory:', err);
          setError('No se pudo cargar la historia. Verifica tu conexión o ID.');
        } finally {
          setIsLoading(false);
        }
      };
      

    if (storyId) {
      fetchStory();
    } else {
      console.warn('storyId no proporcionado.');
      setError('No se proporcionó un ID de historia válido.');
      setIsLoading(false);
    }
  }, [storyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Enviando datos actualizados:', story);
      const updatedStory = await updateStoryInEpic(storyId, story); // Ajustado para recibir la respuesta parseada
      alert('Historia actualizada exitosamente.');
      updateState((prevStories) =>
        prevStories.map((item) => (item._id === storyId ? updatedStory : item))
      );
      closeForm();
    } catch (err) {
      console.error('Error al actualizar la historia:', err);
      alert(`Hubo un problema al actualizar la historia: ${err.message}`);
    }
  };
  

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='contenedor'>
      <h2>Editar Historia</h2>
      <form onSubmit={handleSubmit} >
        <label className='label1'>
          Nombre:
          <input className='input1'
            type="text"
            value={story.name}
            onChange={(e) => setStory({ ...story, name: e.target.value })}
            
          />
        </label>
        <label className='label1'>
          Descripción:
          <input className='input1'
            type="text"
            value={story.description}
            onChange={(e) => setStory({ ...story, description: e.target.value })}
            
          />
        </label>
        <button type="submit" className='boton' >
          Guardar Cambios
        </button>
        <button onClick={closeForm} className='boton'> Cerrar</button>
      </form>
      
    </div>
  );
};

export default EditStoryForm;
