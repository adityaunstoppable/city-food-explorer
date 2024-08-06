import { useEffect , useState} from "react"

const useFindLocation = () => {

    const [currentLocation , setCurrentLocation] = useState({latitude:30.741482 , longitude : 76.768066})

    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude
                    const longitude = position.coords.longitude

                    setCurrentLocation({latitude , longitude})
                }, 
                error => {
                    setCurrentLocation(error)
                }
            )
        }
    },[])

    if(currentLocation && !currentLocation.message){
        return currentLocation
    }else{
        return ({latitude:28.7041 , longitude:77.1025})
    }
}

export default useFindLocation