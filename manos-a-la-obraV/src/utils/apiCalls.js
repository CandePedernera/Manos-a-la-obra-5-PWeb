import { useEffect, useState } from 'react';

const header = {
  'Content-Type': 'application/json',
  'auth': localStorage.getItem('token')
};
const BASE_URL = 'https://lamansysfaketaskmanagerapi.onrender.com/api';
export const patch = (url, body) => {
  const response = fetch(`${BASE_URL}${url}`
    ,{
        method: 'PATCH',
        headers: header,
        body: JSON.stringify(body),
    })
    .then((response) => {
        return response.json()}
    );
return response;
}

export const deleteFunc = (url) => {
  const response = fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
    headers: header,
  })
  .then((response) => {
    return response.json();
  });

  return response;
};

//Hooks epicas:
  // Hook para obtener las épicas
  export const useFetchEpics = (epicId) => {
    const [epics, setEpics] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/epics/${epicId}`, {
        method: 'GET',
        headers: header
      })
        .then(response => response.json())
        .then(data => setEpics(data.data))
        .catch(err => setError(err));
    }, [epicId]);

    return { epics, error };
  };

  // Hook para obtener las epicas de un proyecto específico
    export const useFetchProjectEpics = (projectId) => {
      const [epics, setEpics] = useState([]);
    
      useEffect(() => {
        fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/projects/${projectId}/epics`, {
          method: 'GET',
          headers: header
        })
        .then(response => response.json())
        .then(data => setEpics(data.data))
      }, [projectId]);
    
      return {epics};
    };


//Hook para historias:
  // Hook para obtener las historias de una épica específica
  export const useFetchEpicsStories = (epicId) => {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/epics/${epicId}/stories`, {
        method: 'GET',
        headers: header
      })
        .then(response => response.json())
        .then(data => setStories(data.data))
        .catch(err => setError(err));
    }, [epicId]);

    return { stories, error };
  };

  // Hook para obtener todas las historias 
  export const useFetchStories = () => {
      const [stories, setStories] = useState([]);
      const [error, setError] = useState(null);
    
    
      useEffect(() => {
        fetch('https://lamansysfaketaskmanagerapi.onrender.com/api/stories', {
          method: 'GET',
          headers: header
        })
          .then(response => response.json())
          .then(data => setStories(data.data))
          .catch(err => setError(err));
      }, []);
    
      return { stories, error };
    };

  // Hook para obtener una historia especifica 
  export const useFetchStoriesSpecific = (storieId) => {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/stories/${storieId}`, {
        method: 'GET',
        headers: header
      })
        .then(response => response.json())
        .then(data => setStories(data.data))
        .catch(err => setError(err));
    }, [storieId]);

    return { stories, error };
  };

//Hook para los proyectos
  //Hook para obtener todas los proyectos
  export const useFetchProjects = () => {
      const [projects, setProyects] = useState([]);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        fetch('https://lamansysfaketaskmanagerapi.onrender.com/api/projects', {
          method: 'GET',
          headers: header
        })
          .then(response => response.json())
          .then(data => setProyects(data.data))
          .catch(err => setError(err));
      }, []);
    
      return { projects, error };
    };

    export const fetchProjectDetails = async (projectId) => {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://lamansysfaketaskmanagerapi.onrender.com/api/projects/${projectId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
        }
      );
    
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al obtener detalles del proyecto: ${errorText}`);
      }
    
      return await response.json();
    };
    
  //Hook para obtener un proyecto especifico
  export const useFetchProjectSpecific = (projectId) => {
    const [projects, setProjects] = useState({}); // Cambiado a un objeto vacío
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/projects/${projectId}`, {
        method: 'GET',
        headers: header
      })
        .then(response => response.json())
        .then(data => setProjects(data.data || {})) // Asegúrate de que sea un objeto
        .catch(err => setError(err));
    }, [projectId]);
  
    return { projects, error };
  };
  

//Hook para tareas
  //Hook para obtener las tareas de una historia
  export const useFetchTasks = (storyId) => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/stories/${storyId}/tasks`, {
        method: 'GET',
        headers: header
      })
        .then(response => response.json())
        .then(data => setTasks(data.data))
        .catch(err => setError(err));
    }, [storyId]);
  
    return { tasks, error };
  };

  export const addTaskToStory = async (taskData) => {
  
    console.log('Datos enviados a la API:', taskData); // Verifica los datos antes de enviarlos
  
    try {
      const response = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/tasks/`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(taskData),
      });
  
      // Si la respuesta no es exitosa, lanzamos un error
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      // Si la respuesta es exitosa, obtenemos los datos
      const data = await response.json();
      console.log('Tarea agregada: ', data);
      return data;
    } catch (error) {
      console.error('Error al agregar tarea:', error);
      throw error; // Lanzamos el error para que pueda ser manejado más arriba
    }
  };

  export const useFetchDeleteTask = () => {
    const [error, setError] = useState(null);

    const deleteTask = async (taskId) => {
      console.log('Intentando eliminar tarea con ID:', taskId);
    
      try {
        const response = await fetch(
          `https://lamansysfaketaskmanagerapi.onrender.com/api/tasks/${taskId}`,
          {
            method: 'DELETE',
            headers: header,
          }
        );
    
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error al eliminar tarea:', errorText);
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }
    
        const data = await response.json();
        console.log('Respuesta del servidor al eliminar tarea:', data);
        return data;
      } catch (err) {
        console.error('Error al ejecutar deleteTask:', err);
        throw err;
      }
    };
    return {deleteTask, error };
  }
  //eliminar historias
  export const deleteStory = async (storyId) => {
    try {
      const response = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/stories/${storyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth': localStorage.getItem('token'), // Si usas autenticación con token
        },
      });
  
      // Verificamos si la respuesta fue exitosa
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al eliminar la historia: ${errorText}`);
      }
  
      return await response.json(); // Devolvemos la respuesta de la API si se eliminó correctamente
    } catch (error) {
      console.error('Error al eliminar la historia:', error);
      throw error; // Lanza el error para que el componente lo maneje
    }
  };
  
  //agregar historias
  // utils/apiCalls.js

  export const addStoryToEpic = async (storyData) => {
    try {
      const response = await fetch('https://lamansysfaketaskmanagerapi.onrender.com/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth': localStorage.getItem('token'), // Si usas autenticación con token
        },
        body: JSON.stringify(storyData), // Asegúrate de que el body tenga los datos correctos
      });
  
      if (!response.ok) {
        throw new Error('Error al agregar la historia');
      }
  
      const data = await response.json();
      console.log('Historia agregada:', data); // Verifica que la respuesta sea la esperada
      return data; // Devuelve la historia creada
    } catch (err) {
      console.error('No se pudo agregar la historia', err);
      throw err; // Propaga el error para ser manejado en el componente
    }
  };
  
  //editar historias


export const updateStoryInEpic = async (storyId, updatedStory) => {
  console.log('Datos enviados a la API:', updatedStory);
  const response = await fetch(
    `https://lamansysfaketaskmanagerapi.onrender.com/api/stories/${storyId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(updatedStory),
      headers: {
        'Content-Type': 'application/json',
        'auth': localStorage.getItem('token'),
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al actualizar: ${response.status} - ${errorText}`);
  }

  return response.json();
};
// apiCalls.js
export const createEpic = async (epicData) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
  }

  try {
    const response = await fetch('https://lamansysfaketaskmanagerapi.onrender.com/api/epics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth': token,
      },
      body: JSON.stringify(epicData), // Enviamos el cuerpo correctamente
    });

    if (!response.ok) {
      const errorDetails = await response.json(); // Intentamos obtener el detalle del error
      throw new Error(`Error al crear épica: ${response.statusText}. Detalles: ${JSON.stringify(errorDetails)}`);
    }

    const data = await response.json();
    return data; // Devuelve la épica creada
  } catch (error) {
    console.error('Error en la creación de la épica:', error);
    throw error;
  }
};







export const addProject = async (projectData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    "https://lamansysfaketaskmanagerapi.onrender.com/api/projects",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify(projectData),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al agregar proyecto: ${errorText}`);
  }

  return await response.json();
};

export const updateProject = async (projectId, updatedProject) => {
  const token = localStorage.getItem('token');
  console.log("Actualizando proyecto con ID:", projectId);
  console.log("Datos del proyecto actualizados:", updatedProject);

  const response = await fetch(
    `https://lamansysfaketaskmanagerapi.onrender.com/api/projects/${projectId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProject),
    }
  );

  console.log('Respuesta de la API:', response);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error al actualizar proyecto:', errorText);
    throw new Error(`Error al actualizar el proyecto: ${errorText}`);
  }

  return await response.json();
};

export const deleteEpic = async (epicId) => {
  const token = localStorage.getItem('token'); // Obtener el token desde el almacenamiento local
  try {
    const response = await fetch(
      `https://lamansysfaketaskmanagerapi.onrender.com/api/epics/${epicId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth': token,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al eliminar la épica: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al eliminar épica:', error);
    throw error;
  }
};
export const updateEpic = async (epicId, updatedData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(
      `https://lamansysfaketaskmanagerapi.onrender.com/api/epics/${epicId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          auth: token,
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar épica: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar épica:', error);
    throw error;
  }
};
