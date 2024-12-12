import { useParams } from 'react-router-dom'
import ProjectDetails from '../molecules/projectDetails/projectDetails'
import LoadingSpinner from '../molecules/loadingSpinner/loadingSpinner';
import Header from '../organisms/header/Header';
import { useFetchProjectSpecific, useFetchProjectEpics } from '../../utils/apiCalls'

function MyProjectsDetails() {
  const { projectId } = useParams();
  const { projects, error: projectError } = useFetchProjectSpecific(projectId); // Hook para obtener épicas
  const { epics, error: epicError } = useFetchProjectEpics(projectId); // Hook para obtener historias
<h1>hola</h1>
  if (projectError || epicError) {
    return <div>Error: {projectError?.message || epicError?.message}</div>;
  }

  if (!projects || !projects.name) {
    return <LoadingSpinner message="Cargando proyecto..." />;
  }

  return (
    <>
      <Header title={`Proyecto`} level={2} />
      <ProjectDetails projects={projects} epics={epics}/>
      </>
  );
}

export default MyProjectsDetails