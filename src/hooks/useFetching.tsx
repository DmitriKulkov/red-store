import {useState} from "react";

export const useFetching =(callback: Function)=>{
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const fetching = async (...args: any):Promise<void> => {
        setIsLoading(true)
        callback(...args)
            .catch((e: any)=>setError(e.message))
            .finally(()=>setIsLoading(false));
    }
    return {fetching, isLoading, error}
}
