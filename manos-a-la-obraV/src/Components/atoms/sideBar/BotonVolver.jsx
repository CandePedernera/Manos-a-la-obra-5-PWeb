import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./stylesBoton.css";

function BotonVolver({ level }) {
  const navigate = useNavigate();
  const goBackHistory = () => {
      navigate(-1);
  };

  return (
      <div>
          {level > 1 && (
              <button onClick={goBackHistory} className='button'>
                  <img src="src/Components/atoms/imgenes/volvervioleta.png" alt="Icono" />
              </button>
          )}
      </div>
  );
}

export default BotonVolver