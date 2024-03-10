import {useEffect} from 'react'
import { useLocation } from 'react-router-dom';

const ToggleMode = (props) => {
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
  useEffect(() => {
    changemode();
    // eslint-disable-next-line
  }, [pathname]);

  return null;
}

export default ToggleMode


