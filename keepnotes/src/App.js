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
// import Togglemode from './Components/Togglemode';
import Forgetpassword from './Components/Forgetpassword';
import Changepassword from './Components/Changepassword';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import AuthState from './Context/Authentication/AuthState';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";



function App() {
  
  const [progress,setProgress]=useState(0);
  // const [Mode,SetMode]=useState('light');
  const [Mode, SetMode] = useState(() => {
    const storedValue = localStorage.getItem('themeMode');
    return storedValue !== null ? storedValue : 'light';
  });
  const toggleMode=()=>{
    if(Mode==='light'){
      SetMode('dark');
      localStorage.setItem('themeMode','dark')
      turnblack();

    }
    else{
      SetMode('light');
      localStorage.setItem('themeMode','light')
      turnlight();
    }
  }

  const turnblack=()=>{
    document.body.style.backgroundColor = '#2e2e2e';
    document.getElementById('navbar').style.backgroundColor='#3f3e3e';
    document.body.style.color='white';
    const links = document.querySelectorAll('#navit');
    links.forEach(link => {
      link.style.color = 'white'; // Change color to white
    });

    const input=document.querySelectorAll('.forminput');
    input.forEach(inputs=>{
      inputs.style.backgroundColor='transparent';
      inputs.style.border='2px solid white';
      inputs.style.color='white';
    });

  }

  const turnlight=()=>{
    document.body.style.backgroundColor = 'white';
    document.body.style.color='black';
    document.getElementById('navbar').style.backgroundColor='white';
    const links = document.querySelectorAll('#navit');
    links.forEach(link => {
      link.style.color = 'black'; // Change color to black
    });
    const input=document.querySelectorAll('.forminput');
    input.forEach(inputs=>{
      inputs.style.backgroundColor='transparent';
      inputs.style.border='2px solid #9a9a9a';
      inputs.style.color='black';
    });
  
  }
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
      <Scrolltop toggle={toggleMode} black={turnblack} light={turnlight} Mode={Mode}/>
      {/* <Togglemode toggle={toggleMode} black={turnblack} light={turnlight} Mode={Mode}/> */}
      {/* <Navbar/> */}
      <Navbar togglemode={toggleMode} Mode={Mode}/>
      <Alert Mode={Mode}/>
      <Analytics/>
      <SpeedInsights/>
      <Routes>
        <Route exact path='/' element={<Home Mode={Mode} togglemode={toggleMode}/>}></Route>
        <Route exact path='/about' element={<About Mode={Mode}/>}></Route>
        <Route exact path='/createnote' element={<Addnote Mode={Mode}/>}></Route>
        <Route exact path='/Profile' element={<Profile Mode={Mode}/>}></Route>
        <Route exact path='/Login' element={<Login Mode={Mode}/>}></Route>
        <Route exact path='/Signup' element={<Signup Mode={Mode}/>}></Route>
        <Route exact path='/Forgetpassword' element={<Forgetpassword Mode={Mode} />}></Route>
        <Route exact path='/Changepassword'  element={<Changepassword Mode={Mode}/>}></Route>


      </Routes>

      <Footer Mode={Mode}/>
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
