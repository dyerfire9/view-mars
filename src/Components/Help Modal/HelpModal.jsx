import React from "react";
import "./style.css"


export default function HelpModal(props){
    let viewer = document.getElementById('help-modal');


    window.onclick = function(event) {
        if (event.target === viewer) {
            props.changeState(prevVal => !prevVal)
        }
  }

    return(
        <div id="help-modal" className={`help-modal fade-in ${props.state ? 'viewer-open' : 'viewer-closed'}`}>
            <div className="help-modal-container">
                <h2>Help Module</h2>
                <div className="help-header">

                </div>
                <div className="help-content">
                    <ul>

                    </ul>
                </div>
            </div>
        </div>
    )
}