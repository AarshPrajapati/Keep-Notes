//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/Note/noteState';
import EmailState from './Context/Email/emailState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Alert from './Components/Alert';
import DisplayAlert from './Context/Alert/displayalert';
import Addnote from './Components/Addnote';
import Profile from './Components/Profile';
import Footer from './Components/Footer';
import Scrolltop from './Components/Scrolltop';
import Forgetpassword from './Components/Forgetpassword';
import Changepassword from './Components/Changepassword';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import AuthState from './Context/Authentication/AuthState';



function App() {
  const [progress,setProgress]=useState(0);
  return (
    
    <>
    <DisplayAlert>    
    <NoteState> 
    <EmailState SetPrograss={setProgress}>
      <AuthState SetPrograss={setProgress}>
      
      <BrowserRouter>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
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
        <Route exact path='/Forgetpassword' element={<Forgetpassword />}></Route>
        <Route exact path='/Changepassword'  element={<Changepassword/>}></Route>


      </Routes>

      <Footer/>
      </BrowserRouter>
      </AuthState>
      </EmailState>
      </NoteState>
      </DisplayAlert>
     {/* <h1>This is Keep-Notes</h1> */}
    </>
  );
}

export default App;
