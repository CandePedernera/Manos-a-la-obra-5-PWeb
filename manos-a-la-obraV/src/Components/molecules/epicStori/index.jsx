import React, { useState, useEffect } from 'react';
import EpicsAndStories from './EpicsAndStories';
import { fetchEpics, fetchStories } from '../utils/apiCalls';

const MainComponent = () => {
    const [epics, setEpics] = useState([]);
    const [stories, setStories] = useState([]);
  
    useEffect(() => {
      const loadData = async () => {
        const epicsData = await fetchEpics();
        const storiesData = await fetchStories();
        setEpics(epicsData);
        setStories(storiesData);
      };
  
      loadData();
    }, []);
  
    return (
      <div>
        <h1>Gestión de Épicas y Historias</h1>
        <EpicsAndStories
          epics={epics}
          stories={stories}
          updateStories={(newStories) => setStories(newStories)} // Aquí pasas la función para actualizar las historias
        />
      </div>
    );
  };
  
export default MainComponent;
