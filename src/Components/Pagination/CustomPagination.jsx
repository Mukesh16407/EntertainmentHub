import React from 'react';

import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';



const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
})

export const CustomPagination = ({setPage,numOfPages=10}) => {

  const handlePageChange =(page)=>{
    setPage(page);
    window.scroll(0,0);
  }
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
      <Pagination 
        count={numOfPages}
        onChange={(e)=>{
          handlePageChange(e.target.textContent)
        }}
        hideNextButton
        hidePrevButton
        color="primary"/>
     </ThemeProvider>
       
    </div>
  )
}
