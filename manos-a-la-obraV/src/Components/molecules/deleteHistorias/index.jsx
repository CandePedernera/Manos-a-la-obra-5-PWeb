import React, { useState } from 'react';
import styles from './DeleteButton.module.css';  // Asegúrate de tener los estilos
import { deleteStory } from '../../../utils/apiCalls';  // Asegúrate de que deleteStory esté correctamente importada

const DeleteButton = ({ storyId, updateState }) => {
  const [confirm, setConfirm] = useState(false);  // Para mostrar la confirmación
  const [showError, setShowError] = useState(false);  // Para manejar errores

  // Función para manejar la eliminación de la historia
  const handleDelete = async () => {
    try {
      await deleteStory(storyId);  // Llamar a la función deleteStory para eliminar la historia
      updateState();  // Actualiza el estado en el componente padre para reflejar los cambios
      alert('Historia eliminada exitosamente');
    } catch (err) {
      console.error('Error al eliminar historia:', err);
      setShowError(true);  // Si hay error, mostramos un mensaje
    }
  };

  return (
    <div>
      <button  onClick={() => setConfirm(!confirm)} className='boton'>
        Eliminar historia
      </button>

      {confirm && (
        <div >
          <h3>¿Estás seguro de eliminar esta historia?</h3>
          <div id={styles.buttonCont}>
            <button className='boton' onClick={handleDelete}>Sí</button>
            <button className='boton' onClick={() => setConfirm(false)}>No</button>
          </div>
          {showError && <h3>Hubo un error al eliminar la historia</h3>}
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
