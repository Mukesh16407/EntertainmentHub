import {Routes,Route} from 'react-router-dom';
import SimpleBottomNavigation from "./Components/MainNav";
import { Container } from "@mui/system";
import { Header } from "./Components/Header";

import{Trending} from './Pages/Trending/Trending';
import {Movies} from './Pages/Movies';
import {Series} from './Pages/Series';
import {Search} from './Pages/Search'
import './App.css'

function App() {
  return (
    <>
    <Header/>
    <div className="App">
      <Container>
         <Routes>
           <Route path='/'element={<Trending/>}/>
           <Route path='/movies'element={<Movies/>}/>
           <Route path='/series'element={<Series/>}/>
           <Route path='/search'element={<Search/>}/>
        </Routes>
      </Container>
      
     </div>
     <SimpleBottomNavigation/>
    </>
    
  );
}

export default App;
