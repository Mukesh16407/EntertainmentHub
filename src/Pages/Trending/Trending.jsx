import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { CustomPagination } from '../../Components/Pagination/CustomPagination';
import { SingleContent } from '../../Components/SingleContent/SingleContent';
import './Trending.css'
export const Trending = () => {

  const [content,setContent] = useState([]);
  const [page, setPage] = useState(1);

  
 
  useEffect(()=>{
    const fetchTrendingData = async()=>{

      const {data} = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      )
      setContent(data.results);
    };
    fetchTrendingData()
  },[page]);

  return (
    <div>
      <span className='pageTitle'>Trending</span>
       <div className='trending'>
          {content && content.map((c)=>{
            return <SingleContent key={c.id}
            id={c.id}
           poster={c.poster_path}
           title={c.title || c.name}
           date={c.release_date || c.first_air_date}
           media={c.media_type}
           vote_average={c.vote_average}/>
          })}
       </div>
        <CustomPagination setPage={setPage}/>
    </div>
  )
}
