import React, { useState, useEffect } from 'react';
import EpicsAndStories from './EpicsAndStories'; // Asegúrate de importar el componente EpicsAndStories
import { deleteStory } from '../utils/apiCalls'; // Asegúrate de tener la función para eliminar historias

const EpicsPage = ({ epics }) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Lógica para obtener las historias (puedes obtenerlas desde una API o localmente)
    // setStories(obtenidasDeLaApi);
  }, [epics]);

  // Función para actualizar las historias después de eliminar una
  const updateStories = (updatedStories) => {
    setStories(updatedStories);
  };

  return (
    <div>
      <EpicsAndStories 
        epics={epics} 
        stories={stories} 
        updateStories={updateStories} // Pasar la función updateStories como prop
      />
    </div>
  );
};

export default EpicsPage;
