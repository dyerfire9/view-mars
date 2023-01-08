import React from "react"
import './style.css'
import temp_pic from './temp_pic.jpg'
import ImageCard from "./ImageCard/ImageCard"
import ImageViewer from "./ImageViewer/ImageViewer"

export default function Dashboard(){  
    const errorLegend = {
        'Negative': 'Enter a Sol value from 0 to current Sol',
        'None': 'Please enter a Sol value',
        'High': 'Sol value must be less than current Sol',
        'Nothing': 'There are no photos for the given para'
    }
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
    let [curCameras, setCurCameras] = React.useState([])
    let [formData, setFormData] = React.useState({
        sol: 10,
        rover: 'Curiosity',
        cameratype: 'NAVCAM',
    })
    let apiKey = 'XrhklQkPEfhtwohJSVqusnTh1VSATt2AkS4fKcPn'
    let apiLink = `https://api.nasa.gov/mars-photos/api/v1/rovers/${formData.rover}/photos?sol=${formData.sol}&camera=${formData.cameratype}&api_key=${apiKey}`

    
    function updateCameras(){
        for(let i = 0; i < roverPhotosList.length; i++) {

            if (roverPhotosList[i].sol === formData.sol){
                setCurCameras(roverPhotosList[i].cameras)
                break;
            }
        }
    } 
    
    console.log(curCameras)
    console.log(formData)
    console.log(data)
    


    function handleChange(event) {
        setFormData(prevFormData =>{
            const {name, value, type, checked} = event.target

            if (name === 'sol' && value ===  ''){
                return{
                    ...prevFormData,
                    [name]: ''
                }
            }
            if (name === 'sol' && value < 0){
                return{
                    ...prevFormData,
                    [name]: 0
                }
            }
            return{
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
        updateCameras()
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
    }, [formData]); 
    
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
        updateCameras()
    }, [formData]);  

    function handleSubmit(event) {
        event.preventDefault()
        console.log('Submit was clicked')
        apiLink = `https://api.nasa.gov/mars-photos/api/v1/rovers/${formData.rover}/photos?sol=${formData.sol}&camera=${formData.cameratype}&api_key=${apiKey}`

    }
    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
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
                        {<option value='Curiosity'>Curiosity</option>}
                        {<option value='Opportunity'>Opportunity</option>}
                        {<option value='Spirit'>Spirit</option>}
                    </select>     
                    <select 
                        id="cameratype"
                        value={formData.cameratype}
                        onChange={handleChange}
                        className="form-input"
                        name="cameratype"
                    >
                    {<option value="">Choose Camera</option>}
                    {curCameras && curCameras.map((cameratype, index) => <option value={cameratype} key={index}>{cameraLegend[cameratype]}</option>)}
                </select>
                <button type="submit" className="form-submit">Submit</button>

            </form>

            <div className="img-info">
                {data && <h3>Rover: {formData.rover} </h3>}
                {data && <h3>Mars Date (sol): {roverData.max_sol} </h3>}
                {data && <h3>Mars Date (sol): {formData.sol} </h3>}
                {/* {data && <h3>Earth Date: {data.photos[0].earth_date} </h3>} */}
            </div>

            <div className="img-container">
                {data && data.photos.map((img, index) => <ImageCard data={img} key={index} state={viewerState} changeState={setViewerState}/>)}
            </div>
            
            <ImageViewer img={viewerState.item.img} state={viewerState} changeState={setViewerState}/>
        </div>
    )
}