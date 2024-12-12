import React from 'react'
import Title from '../../atoms/title/title.jsx'
import HamburguerMenu from '../../molecules/hamburgerMenu/hamburguerMenu.jsx'
import './styles.css';

export default function Header({title, level}) {
  return (
    <div className='header'>
      <HamburguerMenu className="hamburger-menu" level={level}/>
      <Title title={title} />
    </div>
  )
}
