import React from "react"
import './style.css'
import temp_pic from './temp_pic.jpg'
import ImageCard from "./ImageCard/ImageCard"
import ImageViewer from "./ImageViewer/ImageViewer"
import JsZip from 'jszip';
import FileSaver from 'file-saver';
import Promise from 'bluebird';


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
        sol: '10',
        rover: 'Curiosity',
        cameratype: 'NAVCAM',
    })
    let apiKey = 'XrhklQkPEfhtwohJSVqusnTh1VSATt2AkS4fKcPn'
    let apiLink = `https://api.nasa.gov/mars-photos/api/v1/rovers/${formData.rover}/photos?sol=${formData.sol}&camera=${formData.cameratype}&api_key=${apiKey}`

    
    function updateCameras(){
        for(let i = 0; i < roverPhotosList.length; i++) {
            console.log(roverPhotosList[i])

            if (roverPhotosList[i].sol === parseInt(formData.sol)){
                setCurCameras(roverPhotosList[i].cameras)
                console.log('This was run')
                break;
            }
        }
    } 
    
    console.log(curCameras)
    console.log(formData)
    console.log(roverPhotosList)
    console.log(roverData)
    console.log(data)

    function downloadAllImages(){
        var src;
        let img_obj = new Image();
        let files = document.getElementsByClassName('imagecard-img')
        let urls = []

        for (let i = 0; i < files.length; i++){
           urls.push(files[i].currentSrc) 
        }

        function crossOrigin(url) {
            var co = "https://api.codetabs.com/v1/proxy?quest=";
            src = co + url;
            img_obj.crossOrigin = 'anonymous';
            img_obj.onload = function() { ; }
            img_obj.src = src;
    
            return img_obj.src;
          }
    
        function download(url){
            let link = crossOrigin(url)

            return fetch(link, {mode: 'cors'})
            .then(resp => resp.blob())
            .catch(() => console.log('An error in downloading the file sorry'));
        }
          
          function groupDownload (urls, files_per_group=5){

            return Promise.map(
              urls, 
              async url => {
                return await download(url);
              },
              {concurrency: files_per_group}
            );
          }
          
          function exportZip(blobs){
            console.log(blobs)
            const zip = JsZip();
            blobs.forEach((blob, i) => {
              zip.file(`file-${i}.png`, blob);
            });
            zip.generateAsync({type: 'blob'}).then(zipFile => {
              const fileName = `${formData.rover}-${formData.cameratype}-sol ${formData.sol}.zip`;
              return FileSaver.saveAs(zipFile, fileName);
            });
          }
          
          groupDownload(urls, 5).then(exportZip);
         
    }

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
                <button type="submit" className="form-submit" onClick={downloadAllImages}>Download All Images</button>

            </form>

            <div className="img-info">
                {data && <h3>Rover: {formData.rover} </h3>}
                {data && <h3>Rover Max Sol: {roverData.max_sol} </h3>}
                {data && <h3>Mars Date (sol): {formData.sol} </h3>}
                {/* {(data != [] && data) && <h3>Earth Date: {data.photos[0].earth_date} </h3>} */}
            </div>

            <div className="img-container">
                {data && data.photos.map((img, index) => <ImageCard data={img} key={index} state={viewerState} changeState={setViewerState}/>)}
            </div>
            
            <ImageViewer img={viewerState.item.img} state={viewerState} changeState={setViewerState}/>
        </div>
    )
}