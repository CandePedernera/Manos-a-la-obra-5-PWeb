import React, { useState } from 'react';
import './StylesStoryDetails.scss';
import { addTaskToStory, useFetchDeleteTask, patch } from '../../../utils/apiCalls'; // Asegúrate de que 'patch' esté importado
import CreateForm from '../FormTasks/CreateForm';
import DeleteButton from '../deletteButtom/index';
import Edit from '../edit/INDEX.JSX';

const StoriesDetails = ({ stories, tasks }) => {
  const { deleteTask, error: deleteTaskError } = useFetchDeleteTask();
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); // Estado para la tarea que se va a editar

  const handleAddTask = async (taskData) => {
    try {
      await addTaskToStory(taskData);
      alert('Tarea agregada exitosamente');
      setShowForm(false); // Ocultar el formulario después de agregar la tarea
    } catch (err) {
      console.error('No se pudo agregar la tarea', err);
      alert('Error al agregar la tarea');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId); // Llama al método para eliminar la tarea
      // Filtra la tarea eliminada de la lista de tareas
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert('Tarea eliminada exitosamente');
    } catch (err) {
      console.error('Error al eliminar tarea:', err);
      alert('Hubo un problema al eliminar la tarea');
    }
  };

  const handleEditTask = async (taskData) => {
    try {
      // Llamar a la API para actualizar la tarea
      await patch(`/tasks/${taskToEdit._id}`, taskData); // Actualiza la tarea usando la API
      alert('Tarea editada exitosamente');
      setTaskToEdit(null); // Restablecer la tarea que se está editando
      setTasks(tasks.map((task) => (task._id === taskToEdit._id ? { ...task, ...taskData } : task))); // Actualizar el estado de tareas
    } catch (err) {
      console.error('No se pudo editar la tarea', err);
      alert('Error al editar la tarea');
    }
  };

  return (
    <div className="story-page-container">
      <div className="story-container">
        <h1 className="story-title">{stories.name}</h1>
        <p className="story-description">{stories.description}</p>
        <h2 className="story-subtitle">Tareas</h2>

        {/* Lista de tareas */}
        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t._id} className="task-item">
              <span className="task-name">{t.name}:</span>
              <p></p>
              <span className="task-description"> {t.description}</span>

              {/* Botón de eliminar */}
              <DeleteButton
                taskId={t._id}
                updateState={() => setTasks(tasks.filter((task) => task._id !== t._id))}
              />

              {/* Botón de editar */}
              <button onClick={() => setTaskToEdit(t)} className='add-project-button'>Editar</button> {/* Al hacer clic, se setea la tarea a editar */}
            </li>
          ))}
        </ul>

        {/* Botón para mostrar el formulario de agregar tarea */}
        <button className="add-project-button" onClick={() => setShowForm(true)}>
          Agregar Tarea
        </button>
        <button className='add-project-button' onClick={() => window.location.reload(false)}>Haz click para ver tus cambios</button>
        {/* Formulario de creación de tarea */}
        {showForm && (
          <CreateForm
            title="Agregar Tarea"
            initialData={{
              done: false,
              story: stories._id,
              name: '',
              description: '',
              created: new Date().toISOString(),
              due: new Date().toISOString(),
            }}
            fields={[
              { name: 'name', label: 'Titulo' },
              { name: 'description', label: 'Descripción' },
            ]}
            onSubmit={handleAddTask}
          />
        )}

        {/* Formulario de edición de tarea */}
        {taskToEdit && (
          <CreateForm
            title="Editar Tarea"
            initialData={{
              name: taskToEdit.name,
              description: taskToEdit.description,
              done: taskToEdit.done,
              due: taskToEdit.due,
            }}
            fields={[
              { name: 'name', label: 'Titulo' },
              { name: 'description', label: 'Descripción' },
            ]}
            onSubmit={handleEditTask}
          />
        )}
      </div>
    </div>
  );
};

export default StoriesDetails;
