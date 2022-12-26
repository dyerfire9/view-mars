import React from "react"
import './style.css'

export default function Dashboard(){    
    let [data, setData] = React.useState()
    let [formData, setFormData] = React.useState({
        sol: '',
        cameratype: '',
    })

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
        fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=555&camera=NAVCAM&api_key=XrhklQkPEfhtwohJSVqusnTh1VSATt2AkS4fKcPn")
        .then(res => res.json())
        .then(data => {setData(data)})
        .catch(err => {
          console.log(err)
        })
    }, [])  

    return (
        <div>
            <div className="form">
                <h2 className="form-header">Input Parameters</h2>
               <input 
                    type="text"
                    className="form-input"
                    value={formData.sol}
                    name="sol"
                    onChange={handleChange}
                    placeholder='Enter Sol'  />

                <input 
                    type="text"
                    className="form-input"
                    value={formData.cameratype}
                    name="cameratype"
                    onChange={handleChange}
                    placeholder='Enter Camera' />
            </div>

            {/* {photos[0].img_src} */}
            {/* {console.log(data.photos[1])} */}
           {/* {<img src={data.photos[2].img_src} alt="" />} */}
        </div>
    )
}