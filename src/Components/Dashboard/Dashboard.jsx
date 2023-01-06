import React from "react"
import './style.css'
import temp_pic from './temp_pic.jpg'
import ImageCard from "./ImageCard/ImageCard"
import ImageViewer from "./ImageViewer/ImageViewer"

export default function Dashboard(){  
    const cameraLegend = {
        'FHAZ': 'Front Hazard Avoidance Camera',
        'RHAZ':'Rear Hazard Avoidance Camera',
        'MAST':'Mast Camera',
        'CHEMCAM':'Chem-Camera Complex',
        'MAHLI':'Mars Hand Lens Imager',
        'MARDI':'Mars Descent Imager',
        'NAVCAM':'Navigation Camera',
        'PANCAM':'Panoramic Camera',
        'MINITES':'Miniature Thermal Emission Spectrometer'
    }

    let [viewerState, setViewerState] = React.useState(({
        isOpen: false,
        item: {
            img: temp_pic
        }

    }))

    let [data, setData] = React.useState()
    let [roverData, setRoverData] = React.useState({})
    let [roverPhotosList, setRoverPhotosList] = React.useState([])
    let [formData, setFormData] = React.useState({
        rover: 'Curiosity',
        sol: 540,
        cameratype: 'NAVCAM',
    })
    let apiKey = 'XrhklQkPEfhtwohJSVqusnTh1VSATt2AkS4fKcPn'
    let apiLink = `https://api.nasa.gov/mars-photos/api/v1/rovers/${formData.rover}/photos?sol=${formData.sol}&camera=${formData.cameratype}&api_key=${apiKey}`
    let currCameras = []

    for (let i = 0; i < roverPhotosList.length; i++){
        if (roverPhotosList[i].sol === formData.sol){
            currCameras = roverPhotosList[i].cameras
        }
    }    

    function handleChange(event) {
        setFormData(prevFormData =>{
            const {name, value, type, checked} = event.target

            return{
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
        // console.log(formData)
    }

    React.useEffect(() => {
        fetch(apiLink)
        .then(res => res.json())
        .then(data => {
            setData(data)
        })
        .catch(err => {
          console.log(err)
        })
    }, []); 
    
    React.useEffect(() => {
        fetch('https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?api_key=XrhklQkPEfhtwohJSVqusnTh1VSATt2AkS4fKcPn')
        .then(res => res.json())
        .then(data => {
            setRoverData(data.photo_manifest)
            setRoverPhotosList(data.photo_manifest.photos)
        })
        .catch(err => {
          console.log(err)
        })
    }, []);  


    return (
        <div>
            <form className="form">
                <h2 className="form-header">Input Parameters</h2>
               <input 
                    type="text"
                    className="form-input"
                    value={formData.sol}
                    name="sol"
                    onChange={handleChange}
                    placeholder='Enter Sol'  />

                    <select 
                        id="rover"
                        value={formData.rover}
                        onChange={handleChange}
                        className="form-input"
                        name="rover"
                        >
                        {<option value="">Curiosity</option>}
                        {<option value="">Opportunity</option>}
                        {<option value="">Spirit</option>}
                    </select>     
                    <select 
                        id="cameratype"
                        value={formData.cameratype}
                        onChange={handleChange}
                        className="form-input"
                        name="cameratype"
                    >
                    {<option value="">Choose Camera</option>}
                    {currCameras && currCameras.map((cameratype, index) => <option value={cameratype} key={index}>{cameraLegend[cameratype]}</option>)}
                </select>
            </form>

            <div className="img-info">
                {data && <h3>Rover: {data.photos[0].rover.name} </h3>}
                {data && <h3>Mars Date (sol): {data.photos[0].sol} </h3>}
                {data && <h3>Earth Date: {data.photos[0].earth_date} </h3>}
            </div>

            <div className="img-container">
                {data && data.photos.map((img, index) => <ImageCard data={img} key={index} state={viewerState} changeState={setViewerState}/>)}
            </div>
            
            <ImageViewer img={viewerState.item.img} state={viewerState} changeState={setViewerState}/>
        </div>
    )
}