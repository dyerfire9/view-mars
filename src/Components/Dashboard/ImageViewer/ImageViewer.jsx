import './style.css';
import React from 'react';
import { BiDownload, BiX} from "react-icons/bi";
import ReactImageMagnify from 'react-image-magnify';

export default function ImageViewer(props){
    let viewer = document.getElementById('imageViewer-viwer');
    const style1 = { color: "white", fontSize: "1.2rem", display:'inline-flex', 'verticalAlign': 'text-top'}

    function toggle(){
        props.changeState(prevVal => ({...prevVal, isOpen: !prevVal.isOpen}))
    }
    function downloadImg(url){
            fetch(url)
            .then(resp => resp.blob())
            .then(blobobject => {
                const blob = window.URL.createObjectURL(blobobject);
                const anchor = document.createElement('a');
                anchor.style.display = 'none';
                anchor.href = blob;
                anchor.download = "name.png";
                document.body.appendChild(anchor);
                anchor.click();
                window.URL.revokeObjectURL(blob);
            })
            .catch(() => console.log('An error in downloading the file sorry'));
    }

    window.onclick = function(event) {
        if (event.target === viewer) {
            props.changeState(prevVal => ({...prevVal, isOpen: !prevVal.isOpen}))
        }
  }
    
    return (
        <div id='imageViewer-viwer' className={`imageViewer-viwer`}>
            <div className='imageViewer-container'>
                <div className="imageViewer-header">
                    <div className="imageViewer-header-container">
                        <button className="imageViewer-download" onClick={downloadImg(props.img)}><BiDownload/></button>
                        <button className="imageViewer-close" onClick={toggle}><BiX/></button>
                    </div>
    
                </div>
                <img src={props.img} className='imageViewer-img' />
            </div>
            
        </div>
    )

}