import React from 'react';
import './stylesBoton.css';

function BotonCerrar({ closeSidebar }) {
    return (
        <button onClick={closeSidebar} className='button'>
              <img src="src/Components/atoms/imgenes/cerrar.png" alt="Icono" />
        </button>
    );
}

export default BotonCerrar;