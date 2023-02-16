import React from "react";
import "./style.css"
import {BiX} from "react-icons/bi";


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
                    <button className="helpmodal-close" onClick={props.changeState}><BiX/></button>

                </div>
                <div className="help-content">
                    <h2>Mars Data Terminology & Info</h2>
                    <br />
                    <ul>
                        <li>⇻ A 'Sol' is a solar day on mars. It is slightly longer than a Earth day</li>
                        <li>⇻ The 'Rover Max Sol' is the most recent Mars day from which photos exist</li>
                        <li>⇻ The Current Rovers that have images available are Curiosity, Spirit, and Opportunity</li>
                        <li>⇻ There are a total of 9 possible camera options however, each rover is not nessesarily equipped with all 9.</li>
                    </ul>

                    <br />
                    <br />

                    <h2>App Functionality Notes</h2>
                    <ul>
                        <br />
                        <li>⇻ The 'Download All Images' may take several seconds to complete. Please wait patiently</li>
                        <li>⇻ If no images are displayed after inputing the parameters, please refresh the page</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}