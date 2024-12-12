import React from 'react'
import { useParams } from 'react-router-dom';
import { useFetchStoriesSpecific, useFetchTasks } from '../../utils/apiCalls'
import Header from '../organisms/header/Header';
import LoadingSpinner from '../molecules/loadingSpinner/loadingSpinner';
import Storydetails from '../molecules/storyDetails/storyDetails'

function StoryDetails() {
  const { storyId } = useParams();

  const { stories, error: storiesError } = useFetchStoriesSpecific(storyId);
  const { tasks, error: tasksError } = useFetchTasks(storyId);


  if (tasksError || storiesError) {
    return <div>Error: {epicsError?.message || storiesError?.message}</div>;
  }

  if (!stories || !stories.name) {
    return <LoadingSpinner message="Cargando detalles de la historia" />;
  }
  
  return (
    <>
      <Header title={`Historia: ${stories.name}`} level={2} />
      <Storydetails stories={stories} tasks={tasks}/>
    </>
  );
}

export default StoryDetails;