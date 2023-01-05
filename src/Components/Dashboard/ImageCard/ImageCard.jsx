import './style.css';
import React from 'react'



export default function ImageCard(props){
    let content = props.data

    function toggle(content){
        props.changeState(prevVal => (
            {...prevVal, 
             isOpen: !prevVal.isOpen,
             item: {img: content.img_src}
            }), props.state)
    }
    return(
    <div className="imagecard-wrapper" onClick={() => toggle(content)}>
        {/* {console.log(props.data.img_src)} */}
        <img src={props.data.img_src} alt="" className="imagecard-img"/>
        <div className="imagecard-imgText">View & Download Image</div>
    </div>
    )
}