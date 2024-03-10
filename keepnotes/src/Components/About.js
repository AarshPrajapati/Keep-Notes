import React from 'react'//rafc

const About = (props) => {

  return (
    <div>
    <div className="About">
        <div className="ab ab1">
            <div className="ab11">
            <h2 className={`${props.Mode==='dark'?'abh2':''}`}>Keep-Notes</h2>
            <p><img alt='rightarrow' src={`${props.Mode==='dark'?"Icons/White_right-arrow.png":"Icons/right-arrow.png"}`} width="13px" />Keep-Notes is a Web application which store user notes and reminde about that note via E-mail.</p>
            <p><img alt='right arrow' src={`${props.Mode==='dark'?"Icons/White_right-arrow.png":"Icons/right-arrow.png"}`} width="13px" />Users Also categories their notes by tag Ex. Personal , Work etc..</p>
            <p><img alt='right arrow' salt='right arrow' src={`${props.Mode==='dark'?"Icons/White_right-arrow.png":"Icons/right-arrow.png"}`} width="13px" />This is a MERN(Mongodb,Express js,React js,Node js) stack project.</p>
        </div>
        <div className="ab12">
            <h2 className={`${props.Mode==='dark'?'abh2':''}`}>About Developer</h2>
            <p><img alt='right arrow' src={`${props.Mode==='dark'?"Icons/White_right-arrow.png":"Icons/right-arrow.png"}`} width="13px" />Name : Aarsh Prajapati.</p>
            <p><img alt='right arrow' src={`${props.Mode==='dark'?"Icons/White_right-arrow.png":"Icons/right-arrow.png"}`} width="13px" />Completed Bachelor's of Computer Application in Khayti college of computer application under Gujrat University with 8.65 CGPA.</p>
            <h3><img alt='right arrow' src={`${props.Mode==='dark'?"Icons/White_right-arrow.png":"Icons/right-arrow.png"}`} width="13px" />Programing language Skills</h3>
            <div className="abskill">
                <span className={`${props.Mode==='dark'?'ablink':''}`}>HTML5</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>CSS</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>Bootstrap</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>Java Script</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>JQuery</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>Rect js</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>Node js</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>Express js</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>Python</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>Unix</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>PHP</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>Asp.net MVC5</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>C#</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>Mongodb</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>MSSQL</span>
                <span className={`${props.Mode==='dark'?'ablink':''}`}>XMAPP</span>

            </div>
        </div>
        </div>
        <div className="ab ab2">
        <div className="ab21"></div>
        <div className="ab22">
            <a className={`${props.Mode==='dark'?'ablink':''}`} href='https://www.instagram.com/aarsh._.802/' rel="noreferrer" target="_blank">Instgram<img alt='logoinstagram' src="Icons/instagram.png" width="20px" /></a>
            <a className={`${props.Mode==='dark'?'ablink':''}`} href='https://github.com/AarshPrajapati/Keep-Notes' rel="noreferrer" target='_blank'>Github<img alt='logogithub' src="Icons/github-sign.png" width="20px" /></a>
            <a className={`${props.Mode==='dark'?'ablink':''}`} href="/">Facebook<img alt='logofb' src="Icons/facebook.png" width="20px" /></a>
            <a className={`${props.Mode==='dark'?'ablink':''}`} href="/">Protfilo<img alt='logoprotfilo' src="Icons/boy.png" width="20px" /></a>

        </div>
        </div>
    </div>

</div>
  )
}

export default About
