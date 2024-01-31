import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <footer>
            <div><img alt='footlogo' className="footlogo" title="logo" src="Logo/Keep-Note.png" width="130px" /></div>
                
            <div className="foot">
                <div className="footeritem1"> 
                <h2>Pages</h2>
                    <ul>
                        <li><Link to="/" className="footitem">Home</Link></li>
                        <li><Link to="/createnote" className="footitem">Create Note</Link></li>
                        <li><Link to="/Profile" className="footitem">Profile</Link></li>
                    </ul>
                </div>
                <div className="footeritem2">
                <h2>Join Us</h2>
                   
                    {!localStorage.getItem('token')?
                     <ul>
                        <li><Link to="/Login" className="footitem">Login</Link></li>
                        <li><Link to="/Signup" className="footitem">Sign up</Link></li>
                    </ul>
                        :
                        <div></div>
                    }
                </div>
                <div className="footeritem3">
                <h2>Contect Us</h2>
                    <ul>
                        <li><a href='https://www.instagram.com/aarsh._.802/' rel="noreferrer" target="_blank" className="footitem">Instgram</a></li>
                        <li><a href='https://github.com/AarshPrajapati' rel="noreferrer" target='_blank' className="footitem">Git Hub</a></li>
                        <li><a href='/' className="footitem">Protfilio</a></li>
                        <li><a href='/' className="footitem">About</a></li>
                    </ul>
                </div>      
            </div>
        </footer>
    </div>
  )
}

export default Footer
