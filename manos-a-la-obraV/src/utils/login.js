export const loginUser = async (formData) => {
    const response = await fetch('https://lamansysfaketaskmanagerapi.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    const data = await response.json();
  
    if (data.status === "Error") {
      throw new Error(data.msg);  // Si el servidor devuelve un error
    }
  
    return data;  // Devuelve los datos en caso de éxito
  };