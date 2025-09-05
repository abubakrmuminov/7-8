import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

export const useCollection = (collectionName) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot)=>{
            // console.log(snapshot);
            const data = []
            snapshot.forEach((item) => {
                data.push({
                    uid: item.id,
                    ...item.data()
                });
                
            });    
            setData(data)        
        })
        return
    }, [collectionName])
    return { data }
}