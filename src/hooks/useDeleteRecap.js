import { useState } from 'preact/hooks'
import APIs from '../components/utility/apis'

const useDeleteRecap = (recapId, auth, currentRoute, classId) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthMatch, setIsAuthMatch] = useState(true)

    const deleteRecap = (deleteSuccess, handleRecapDelete) => {
        const config = {
            recapId,
            auth: auth.value
        }
        
        setIsLoading(true)
        APIs.deleteRecapByRecapId(config, (res) => {
            setIsLoading(false)
            if (res.data != undefined && 'result' in res.data) {
                deleteSuccess()
                handleRecapDelete(currentRoute, classId)
            } else if ('error' in res) { 
                setIsAuthMatch(false)
            }
        })
    }
    
    return { deleteRecap, isLoading, isAuthMatch }
}

export default useDeleteRecap
