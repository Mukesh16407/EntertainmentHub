import React from 'react'
import './Header.css'

export const Header = () => {
  return (
    <span className='header' onClick={()=>{
      window.scroll(0,0)
    }}>Entertainment Hub</span>
  )
}
