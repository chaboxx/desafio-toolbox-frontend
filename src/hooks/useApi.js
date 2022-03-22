import { useState } from "react";
import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:4000",
})


const useApi = () =>{
    
    const [checking, setChecking] = useState(true);
    const [data, setData] = useState([]);
    const getAll =async(url) =>{
        
        const resp = await api.get(`${url}`)
        
        setData(resp.data.data)
        setChecking(false)
    }   
        
    const getByQuery = async( url,query ) =>{
  
        const resp = await api.get(`${url}?fileName=${query}`)
        return resp
            
      
    }
    
    return {
        data,
        checking,
        getAll,
        getByQuery,
        
    }
    
}


export {
    useApi,
   
}