import React, { useEffect  , useState} from 'react'

const useOnlineStatus = () => {

    const [isUserOnline , setIsUserOnline]  = useState(true)
    useEffect(() => {

        const handOnline = () => {
            setIsUserOnline(true)
        }
        const handOffline = () => {
            setIsUserOnline(false)
        }

        window.addEventListener("online" , handOnline)
        window.addEventListener("offline" , handOffline)

        return () => {
            window.removeEventListener("online" , handOnline)
            window.removeEventListener("offline" , handOffline)
        }
    },[])

    return isUserOnline;
}

export default useOnlineStatus