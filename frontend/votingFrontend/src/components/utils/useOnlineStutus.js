import { useEffect, useState } from "react"


const useOnlineStatus = ()=>{

    const [onlineStatus,setOnlineStatus] = useState(true)

    useEffect(()=>{
        window.addEventListener("online", (event) => {
            setOnlineStatus(true)
            console.log("status is ",onlineStatus)
        });
       window.addEventListener("offline", (event) => {
            setOnlineStatus(false)
            console.log("status is ",onlineStatus)
    
            
        });

    },[])

   

    


    return onlineStatus

}

export default useOnlineStatus