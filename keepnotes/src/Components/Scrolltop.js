import {useEffect} from 'react'
import { useLocation } from 'react-router-dom';

const Scrolltop = (props) => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();
  // Automatically changes the mode of page
  const changemode=()=>{
    if(props.Mode==='dark'){
      props.black();
    }
    else{
      props.light();
    }
  }
  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
    changemode();
    // eslint-disable-next-line
  }, [pathname]);

  return null;
}

export default Scrolltop
