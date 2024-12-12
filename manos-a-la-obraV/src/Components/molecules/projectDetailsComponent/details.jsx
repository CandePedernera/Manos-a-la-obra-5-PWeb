/*import React, { useState, useEffect } from 'react';
import ProjectDetailsComponent from '../projectDetails/projectDetails';
import { addEpicToProject, fetchProjectDetails } from '../../../utils/apiCalls';

const ProjectDetailsContainer = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [epics, setEpics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProjectDetails(projectId);
      setProject(data.project);
      setEpics(data.epics);
    };

    fetchData();
  }, [projectId]);

  const handleAddEpic = async (epicData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token no encontrado. Por favor, inicia sesión.');
      return;
    }
  
    try {
      const newEpic = await addEpicToProject(epicData);
      setEpics((prevEpics) => [...prevEpics, newEpic]);
    } catch (err) {
      console.error('Error al agregar épica:', err);
      alert(`Hubo un problema al agregar la épica: ${err.message}`);
    }
  };
  
  console.log('handleAddEpic in container:', handleAddEpic);

  if (!project) return <div>Loading...</div>;

  return (
   
    <ProjectDetailsComponent
  projects={project}
  epics={epics}
  handleAddEpic={handleAddEpic} // Propiedad correcta
/>

  );
};

export default ProjectDetailsContainer;
*/