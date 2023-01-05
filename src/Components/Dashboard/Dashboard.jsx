import React from "react"
import './style.css'
import ImageCard from "./ImageCard/ImageCard"

export default function Dashboard(){    
    let [data, setData] = React.useState()
    let [formData, setFormData] = React.useState({
        sol: '550',
        cameratype: 'NAVCAM',
    })

    let apiLink = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${formData.sol}&camera=${formData.cameratype}&api_key=XrhklQkPEfhtwohJSVqusnTh1VSATt2AkS4fKcPn`

    function handleChange(event) {
        setFormData(prevFormData =>{
            const {name, value, type, checked} = event.target

            return{
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
        console.log(formData)
    }

    React.useEffect(() => {
        // Now this fetch data call will run only once since the dependencies array is empty
        fetch(apiLink)
        .then(res => res.json())
        .then(data => {setData(data)})
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
                        id="cameratype"
                        value={formData.cameratype}
                        onChange={handleChange}
                        className="form-input"
                        name="cameratype"
                    >
                    <option value="">Choose Camera</option>
                    <option value="FHAZ">Front Hazard Avoidance Camera</option>
                    <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                    <option value="MAST">Mast Camera</option>
                    <option value="CHEMCAM">Chemistry and Camera Complex</option>
                    <option value="MAHLI">Mars Hand Lens Imager</option>
                    <option value="MARDI">Mars Descent Imager</option>
                    <option value="NAVCAM">Navigation Camera</option>
                </select>
            </form>

            {/* {photos[0].img_src} */}
            {console.log(data && data.photos)}
            <div className="img-info">
                <h3>Rover:  </h3>
                <h3>Mars Date (sol): </h3>
                <h3>Earth Date: </h3>
            </div>

            <div className="img-container">
                {data && <ImageCard data={data.photos[4]}/>}
                {data && <ImageCard data={data.photos[3]}/>}
                {data && <ImageCard data={data.photos[33]}/>}
                {data && <ImageCard data={data.photos[55]}/>}
                {/* {data && data.photos.map((img, index) => <ImageCard data={img} key={index}/>)} */}


            </div>
           {/* {data && data.photos.map((img, index) => <ImageCard data={img} key={index}/>)} */}
        </div>
    )
}