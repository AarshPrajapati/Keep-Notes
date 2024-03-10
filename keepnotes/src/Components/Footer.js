import React from 'react'
import { Link } from 'react-router-dom'

const Footer = (props) => {
  return (
    <div>
        <footer>
            <div><img alt='footlogo' className="footlogo" title="logo" src="Logo/Keep-Note.png" width="130px" /></div>
                
            <div className="foot">
                <div className="footeritem1"> 
                <h2 className={`${props.Mode==='dark'?'abh2':''}`}>Pages</h2>
                    <ul>
                        <li><Link to="/" className={`footitem ${props.Mode==='dark'?'ablink':''}`}>Home</Link></li>
                        <li><Link to="/createnote" className={`footitem ${props.Mode==='dark'?'ablink':''}`}>Create Note</Link></li>
                        <li><Link to="/Profile" className={`footitem ${props.Mode==='dark'?'ablink':''}`}>Profile</Link></li>
                    </ul>
                </div>
                <div className="footeritem2">
                <h2 className={`${props.Mode==='dark'?'abh2':''}`}>Join Us</h2>
                   
                    {!localStorage.getItem('token')?
                     <ul>
                        <li><Link to="/Login" className={`footitem ${props.Mode==='dark'?'ablink':''}`}>Login</Link></li>
                        <li><Link to="/Signup" className={`footitem ${props.Mode==='dark'?'ablink':''}`}>Sign up</Link></li>
                    </ul>
                        :
                        <div></div>
                    }
                </div>
                <div className="footeritem3">
                <h2 className={`${props.Mode==='dark'?'abh2':''}`}>Contect Us</h2>
                    <ul>
                        <li><a href='https://www.instagram.com/aarsh._.802/' rel="noreferrer" target="_blank" className={`footitem ${props.Mode==='dark'?'ablink':''}`}>Instgram</a></li>
                        <li><a href='https://github.com/AarshPrajapati/Keep-Notes' rel="noreferrer" target='_blank' className={`footitem ${props.Mode==='dark'?'ablink':''}`}>Git Hub</a></li>
                        <li><a href='/' className={`footitem ${props.Mode==='dark'?'ablink':''}`}>Protfilio</a></li>
                        <li><a href='/' className={`footitem ${props.Mode==='dark'?'ablink':''}`}>About</a></li>
                    </ul>
                </div>      
            </div>
            
            <div className='copyright'>
                <p className={`${props.Mode==='dark'?'ablink':''}`}>Author: Aarsh Prajapati</p>
                <p className={`${props.Mode==='dark'?'ablink':''}`}>&copy; 2024 Keep-Notes. All rights reserved.</p>    
            </div>
        </footer>
    </div>
  )
}


export default Footer


