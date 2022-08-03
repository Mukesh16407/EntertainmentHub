import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SingleContent } from '../Components/SingleContent/SingleContent';
import { CustomPagination } from '../Components/Pagination/CustomPagination';
import { Genres } from '../Components/Genres';
import useGenres from '../Hooks/useGenre';

export const Movies = () => {
  
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [genresData, setGenresData] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL =useGenres(selectedGenres)
  
  useEffect(()=>{
    const fetchMoviesApi = async()=>{
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    }
    fetchMoviesApi()
  },[page,genreforURL]);
   
  return (
    <div>
       <span className='pageTitle'>Movies</span>
       <Genres 
       type="movie" 
       selectedGenres={selectedGenres}
       setSelectedGenres={setSelectedGenres}
       genresData={genresData}
       setGenresData={setGenresData}
       setPage={setPage}
       />
       <div className='trending'>
          {content && content.map((c)=>(
           <SingleContent 
           key={c.id}
            id={c.id}
           poster={c.poster_path}
           title={c.title || c.name}
           date={c.release_date || c.first_air_date}
           media="movie"
           vote_average={c.vote_average}/>
          ))}
       </div>
       {numOfPages > 1 &&(
         <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
       )}
    </div>
  )
}
