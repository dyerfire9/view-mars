import React from "react"
import HelpModal from '../Help Modal/HelpModal'

import './style.css'


export default function Navbar(){
    let [help]
    return (
        <div className='navbar'>
            <h1 className="navbar-header justify-start">ViewMars</h1>
            <div className='navbar-buttons'> 
                <a href="#Footer">About</a>
                <a onclick={}>Help</a>
            </div>
        <HelpModal id="HelpModal" className=""/>
        </div>
    )
}