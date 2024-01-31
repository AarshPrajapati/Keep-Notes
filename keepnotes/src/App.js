//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/Note/noteState';

import Login from './Components/Login';
import Signup from './Components/Signup';
import Alert from './Components/Alert';
import DisplayAlert from './Context/Alert/displayalert';
import Addnote from './Components/Addnote';
import Profile from './Components/Profile';
import Footer from './Components/Footer';
import Scrolltop from './Components/Scrolltop';



function App() {

  return (
    
    <>
    <DisplayAlert>    
    <NoteState> 
      
      <BrowserRouter>
      <Scrolltop/>
      <Navbar/>
      <Alert/>

    
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/about' element={<About/>}></Route>
        <Route exact path='/createnote' element={<Addnote/>}></Route>
        <Route exact path='/Profile' element={<Profile/>}></Route>
        <Route exact path='/Login' element={<Login/>}></Route>
        <Route exact path='/Signup' element={<Signup/>}></Route>
      </Routes>

      <Footer/>
      </BrowserRouter>
      
      </NoteState>
      </DisplayAlert>
     {/* <h1>This is Keep-Notes</h1> */}
    </>
  );
}

export default App;
