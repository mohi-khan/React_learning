import { useEffect, useState } from "react";

export default function WindowWidth(){
    const [width,setWidth] = useState(window.innerWidth); 
    useEffect(()=>{
        const handleResize = ()=>{
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[]);
    return (
        <div>
          <h1>Current Window Width: {width}px</h1>
        </div>
      );
    
}