import { ref, watchEffect } from "vue"
import { projectFirestore } from "../firebase/config"

const getDocument = (collection,documentId)=> {
    const document = ref(null)
    const error = ref(null)

    let documentRef = projectFirestore.collection(collection).doc(documentId)

    const unsub = documentRef.onSnapshot((doc)=>{
        if(doc.data()){
            document.value = {...doc.data(),id:doc.id}
            error.value = null
        }else {
            error.value = 'document does not exist'
        }
        
        
    },(err)=>{
        console.log(err.message)
        error.value = 'Could not fetch the document!'
    })

    watchEffect((onInvalidate)=>{
        //unsub from previous collection when watcher is stopped (component unmounted)
        onInvalidate(()=>unsub())
    })

    return {error,document}
    
}

export default getDocument