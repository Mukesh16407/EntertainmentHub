import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {styled} from '@mui/material'
import axios from 'axios';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from '../Config/Config';
import './ContentModel.css';
import {Gallery} from '../Carousel/Carousel';

const Modal1 = styled(Modal)(({theme})=>({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const Icons = styled('div')((theme)=>({
  width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow:5,
    spacing: [1, 1, 3],
})) 



export default function ContentModel({children,media,id}) {

  
 
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState();
  const [video, setVideo] = React.useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    
    setVideo(data.results[0]?.key);
  };
 React.useEffect(()=>{
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
 },[])
  return (
    <div >
      <div onClick={handleOpen} className='media'>{children}</div>
      <Modal1
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content &&(
            <Icons>
            <div className='ContentModal'>
            <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                      <span className="ContentModal__title">
                      {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                      </span>
                      {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                   <span className="ContentModal__description">
                    {content.overview}
                  </span>
                  <div>
                     <Gallery/>
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
            </div>
          </Icons>
          )}
         
        </Fade>
      </Modal1>
    </div>
  );
}