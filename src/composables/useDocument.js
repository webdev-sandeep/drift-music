import { ref } from "vue"
import { projectFirestore } from "../firebase/config"

const useDocument = (collection,documentId) => {
    const error  = ref('')
    const isPending = ref(false)

    let docRef = projectFirestore.collection(collection).doc(documentId)

    const deleteDocument = async()=> {
        error.value = null
        isPending.value = true
        try {
            const res = await docRef.delete()
            isPending.value = false
            return res
        }catch(err){
            console.log(err.message)
            isPending.value = false
            error.value = 'Unable to delete the document'
        }
    }

    const updateDocument = async(updates) => {
        isPending.value = true
        error.value = null;
        try{
            const res = await docRef.update(updates)
            isPending.value =false
        }catch(err){
            console.log(err.message)
            isPending.value= false
            error.value = 'Can not update the document.'
        }
    }
    

    return {error, isPending, deleteDocument, updateDocument}
}

export default useDocument