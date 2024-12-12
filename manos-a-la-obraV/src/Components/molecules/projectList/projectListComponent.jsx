import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StylesProject.scss';
import AddProjectForm from '../addProject/addProject';
import EditProjectForm from '../editProjectForm/editProjectForm';

const ProjectListComponent = ({ projects, setProjects, onProjectAdded }) => {
  const [showForm, setShowForm] = useState(false); // Controla la visibilidad del formulario
  const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito
  const [editingProject, setEditingProject] = useState(null);


  const handleProjectAdded = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
    onProjectAdded?.(newProject); // Llama la función del padre si está disponible
    setShowForm(false); // Oculta el formulario después de agregar el proyecto

    // Muestra el mensaje de éxito
    setSuccessMessage("¡Proyecto agregado correctamente!");

    // Oculta el mensaje después de 3 segundos
    setTimeout(() => {
      setSuccessMessage(""); // Reset el mensaje después de 3 segundos
    }, 3000);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await fetch(
        `https://lamansysfaketaskmanagerapi.onrender.com/api/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Verificar la respuesta completa
      console.log("Response Status:", response.status); // Muestra el código de estado de la respuesta
      const responseText = await response.text();
      console.log("Response Body:", responseText); // Muestra el cuerpo de la respuesta
  
      if (response.ok || response.status === 204) {
        // Si la respuesta es exitosa (200-299) o 204 No Content (sin contenido, eliminación exitosa)
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId)
        );
  
        // Muestra el mensaje de éxito
        setSuccessMessage("¡Proyecto eliminado correctamente!");
  
        // Oculta el mensaje después de 3 segundos
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        // Si la respuesta no es exitosa, lanza un error
        throw new Error(responseText || "Hubo un error al eliminar el proyecto");
      }
    } catch (err) {
      // Si ocurre cualquier error, ya sea de red o de la API, mostramos el error
      console.error("Error:", err);
      setSuccessMessage("Hubo un error al eliminar el proyecto");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };
  
  const handleProjectUpdated = (updatedProject) => {
    setProjects((prevProjects) => 
      prevProjects.map(project =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };
  
  

  const handleEditProject = (project) => {
    console.log("Editando proyecto:", project);
    setEditingProject(project);
  };
  

  return (
    <div className="main-container">
      <div className="projects-wrapper">
        <ul className="projects-list">
          {projects.map((project) => (
            <li key={project._id} className="project-item">
              <Link to={`/projects/${project._id}/epics`} className="project-link">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
              </Link>
              {/* Botón de eliminar */}
              <button
                className="delete-project-button"
                onClick={() => handleDeleteProject(project._id)}
              >
                Eliminar
              </button>

              <button className="edit-project-button"onClick={() => handleEditProject(project)}>
                  Editar
                </button>

            </li>
          ))}
        </ul>

        {/* Aquí se coloca el botón para agregar un proyecto */}
        <button 
          className="add-project-button" 
          onClick={() => setShowForm(true)}
        >
          Agregar Proyecto
        </button>
        
        {/* Muestra el formulario solo si 'showForm' es true */}
        {showForm && <AddProjectForm onProjectAdded={handleProjectAdded} />}

        {/* Muestra el mensaje de éxito o error si está disponible */}
        {successMessage && <div className="success-message">{successMessage}</div>}
         {/* Mostrar el formulario de edición si se está editando un proyecto */}
         
         {editingProject && (
          <EditProjectForm
            project={editingProject}
            onProjectUpdated={handleProjectUpdated}
          />
        )}
        
      
        <button className='add-project-button' onClick={() => window.location.reload(false)}>Haz click para ver tus cambios</button>
      </div>
    </div>
  );
};

export default ProjectListComponent;
