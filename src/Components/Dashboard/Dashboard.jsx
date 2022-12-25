import React from "react"


export default function Dashboard(){
    // let [data, setData] = React.useState()

    // React.useEffect(() => {
    //     // Now this fetch data call will run only once since the dependencies array is empty
    //     fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=555&camera=fhaz&api_key=XrhklQkPEfhtwohJSVqusnTh1VSATt2AkS4fKcPn")
    //     .then(res => res.json())
    //     .then(data => {setData(data)})
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }, [])  

    return (
        <div>
            {/* photos[0].img_src */}
            {/* {console.log(data.photos[1])} */}
            {/* <img src={data.photos[1].img_src} alt="" /> */}
        </div>
    )
}