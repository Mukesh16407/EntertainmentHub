import React from 'react'
import { Badge } from '@mui/material';
import {img_300, unavailable} from '../Config/Config';
import './SingleContent.css'

export const SingleContent = ({id,poster,
    title,date,media,vote_average}) => {
  return (
    <div className='media'>
      <Badge badgeContent={vote_average} color= {vote_average > 6 ?"primary":"secondary"}/>
       <img 
       className='poster'
       src={poster?`${img_300}/${poster}`:unavailable} alt={title}/>
       <b className='title'>{title}</b>
       <span className='subTitle'>{media==="tv"? "TV Series":"Movies"}
       <span className='subTitle'>{date}</span>
       </span>
       
    </div>
  )
}
