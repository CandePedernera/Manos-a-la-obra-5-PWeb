import React, { useState } from 'react';
import { deleteFunc } from '../../../utils/apiCalls';
import { useNavigate } from 'react-router-dom';
import styles from './DeleteButton.module.css';


export default function DeleteButton({ updateState, taskId, type }) {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [showError, setShowError] = useState(false);

  const deleteElement = (e) => {
    e.preventDefault();
    const taskUrl = `/tasks/${taskId}`; // La URL de la tarea a eliminar

    deleteFunc(taskUrl)
      .then((data) => {
        if (data.status === 'success') {
          updateState(); // Actualiza el estado (por ejemplo, elimina la tarea de la lista de tareas)
          if (type !== 'task') {
            navigate(-1); // Redirige si es necesario (por ejemplo, a la página anterior)
          }
        } else {
          setShowError(true); // Si la respuesta no es exitosa, muestra el error
        }
      })
      .catch((error) => {
        setShowError(true); // Si hay algún error, muestra el mensaje de error
        console.error("Error al eliminar tarea:", error);
      });
  };

  return (
    <div>
      <button className='add-project-button' onClick={() => setConfirm(!confirm)}>
        Eliminar
      </button>

      {confirm && (
        <div >
          <h3>¿DELETE?</h3>
          <div id={styles.buttonCont}>
            <button className='add-project-button' onClick={(e) => deleteElement(e)}>YES</button>
            <button className='add-project-button' onClick={() => setConfirm(!confirm)}>NO</button>
          </div>
          {showError ? <h3>Hubo un error</h3> : null}
        </div>
      )}
    </div>
  );
}
