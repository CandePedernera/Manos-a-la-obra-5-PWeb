import React, { useState, useEffect } from "react";
import ProjectListComponent from "../projectList/projectListComponent";
import { useFetchProjects } from "./apiCalls";

const ProjectListContainer = () => {
  const { projects: fetchedProjects, error } = useFetchProjects();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (fetchedProjects) setProjects(fetchedProjects);
  }, [fetchedProjects]);

  const handleProjectAdded = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <div>
      <h1>Proyectos</h1>
      {error && <p>Error al cargar proyectos: {error.message}</p>}
      <ProjectListComponent 
        projects={projects} 
        setProjects={setProjects} 
        onProjectAdded={handleProjectAdded} 
      />
    </div>
  );
};

export default ProjectListContainer;
