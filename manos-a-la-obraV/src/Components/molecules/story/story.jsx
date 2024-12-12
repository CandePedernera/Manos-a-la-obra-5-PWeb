import React from 'react';
import './StylesStory.css'
import { Link } from 'react-router-dom'

const Story = ({ stories }) => {

  return (
    <div className="story-list">
      {stories.map((stories) => (
        <li key={stories._id} className="project-item">
          <Link to={`/stories/${stories._id}/tasks`} className="project-link">
            <h3 className="project-name">{stories.name}</h3>
            <p className="project-description">{stories.description}</p>
          </Link>
        </li>))}
    </div>
  );
};

export default Story;