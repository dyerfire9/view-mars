import './style.css';
import React from 'react'



export default function ImageCard(props){
    let content = props.img

    return(
    <div className="imagecard-wrapper">
        {/* {console.log(props.data.img_src)} */}
        <img src={props.data.img_src} alt="" className="imagecard-img"/>
        <div className="imagecard-imgText">View & Download Image</div>
    </div>
    )
}