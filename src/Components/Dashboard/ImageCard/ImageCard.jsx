import './style.css';



export default function ImageCard(props){
    return(
    <div className="imagecard-wrapper">
        {console.log(props.data.img_src)}
        <img src={props.data.img_src} alt="" className="imagecard-img"/>
        <div className="imagecard-info">
        
        </div> 
    </div>
    )
}