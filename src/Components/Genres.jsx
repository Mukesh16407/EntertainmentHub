import React, { useEffect } from "react";
import Chip from '@mui/material/Chip';
import axios from 'axios';

export const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genresData,
  setGenresData,
  type,
  setPage,
}) => {

const handleAdd =(genre)=>{
  setSelectedGenres([...selectedGenres,genre]);
  setGenresData(genresData.filter((g)=> g.id !==genre.id));
  setPage(1)
}

const handleRemove = (genre) => {
  setSelectedGenres(
    selectedGenres.filter((selected) => selected.id !== genre.id)
  );
  setGenresData([...genresData, genre]);
  setPage(1);
};

const fetchGenresData= async()=>{

  try{
    const {data} =  await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setGenresData(data.genres)

  }catch(err){
    console.log(err)
  }
}
useEffect(()=>{
  fetchGenresData() 

  // eslint-disable-next-line
},[])
 
  return (
  <div style={{padding:"6px 0px" }}>
   {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genresData.map((genre) => (
        <Chip
          style={{ margin: 2,backgroundColor:"white" }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
  </div>
  );
};
