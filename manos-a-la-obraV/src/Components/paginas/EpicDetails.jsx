import { useParams } from 'react-router-dom';
import Header from '../organisms/header/Header';
import EpicsAndStories from '../molecules/epicsAndStories/epicsAndStories.jsx'
import LoadingSpinner from '../molecules/loadingSpinner/loadingSpinner';
import { useFetchEpics, useFetchEpicsStories } from '../../utils/apiCalls'

function EpicDetails() {
  const { epicId } = useParams(); // Obtener el parámetro `epicId` de la URL
  const { epics, error: epicsError } = useFetchEpics(epicId); // Hook para obtener épicas
  const { stories, error: storiesError } = useFetchEpicsStories(epicId); // Hook para obtener historias

  if (epicsError || storiesError) {
    return <div>Error: {epicsError?.message || storiesError?.message}</div>;
  }

  if (!epics || !epics.name) {
    return <LoadingSpinner message="Cargando epicas" />; // Mostrar un indicador de carga si los datos no están listos
  }

    return (
      <>
        <Header title={`Epica: ${epics.name}`} level={2} />
        <EpicsAndStories epics={epics} stories={stories}/>
      </>
    );
  }

export default EpicDetails;