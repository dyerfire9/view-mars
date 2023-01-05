import './style.css';
import React from 'react';


export default function ImageViewer(props){
    let viewer = document.getElementById('ImageViewer-viwer');

    function toggle(){
        props.changeState(prevVal => ({...prevVal, isOpen: !prevVal.isOpen}))
    }

    window.onclick = function(event) {
        if (event.target === viewer) {
            props.changeState(prevVal => ({...prevVal, isOpen: !prevVal.isOpen}))
        }
  }
    
    return (
        <div>
            <div id='ImageViewer-viwer' className={`ImageViewer-viwer`}>


            </div>
        </div>
    )

}