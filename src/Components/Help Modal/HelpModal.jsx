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
                <div className="help-header">
                    <h2>Help Module</h2>

                </div>
                <div className="help-content">
                    <h2>Mars Data Terminology</h2>
                    <ul>
                        <li>A 'Sol' is a solar day on mars. It is slightly longer than a Earth day</li>
                        <li>The 'Rover Max Sol' is the most recent Mars day from which photos exist</li>
                    </ul>

                    <h2>App Functionality Notes</h2>
                    <ul>
                        <li>The 'Download All Images' may take several seconds to complete. Please wait patiently</li>
                        <li>if no images are displayed after inputing the parameters, please refresh the page. </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}