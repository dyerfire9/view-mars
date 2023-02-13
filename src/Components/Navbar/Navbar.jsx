import React from "react"
import HelpModal from '../Help Modal/HelpModal'

import './style.css'


export default function Navbar(){
    let [helpModal, setHelpModal] = React.useState(false)

    function toggle(){
        setHelpModal(prevVal => !prevVal)
    }

    return (
        <div className='navbar'>
            <h1 className="navbar-header justify-start">ViewMars</h1>
            <div className='navbar-buttons'> 
                <a href="#Footer">About</a>
                <a onClick={toggle}>Help</a>
            </div>
            <HelpModal state={helpModal} changeState={toggle} />

        </div>
    )
}