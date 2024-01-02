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


function App() {

  return (
    
    <>
    <DisplayAlert>    
    <NoteState> 
      
      <BrowserRouter>
      <Navbar/>
      <Alert/>

      <div className="container">
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/about' element={<About/>}></Route>
        <Route exact path='/createnote' element={<Addnote/>}></Route>
        <Route exact path='/Login' element={<Login/>}></Route>
        <Route exact path='/Signup' element={<Signup/>}></Route>
        
      </Routes>
      </div>
      </BrowserRouter>
      
      </NoteState>
      </DisplayAlert>
     {/* <h1>This is Keep-Notes</h1> */}
    </>
  );
}

export default App;
