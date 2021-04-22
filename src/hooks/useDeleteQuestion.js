import { useState } from 'preact/hooks'
import APIs from '../components/utility/apis'

const useDeleteQuestion = (questionId, auth, currentRoute, classId) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthMatch, setIsAuthMatch] = useState(true)

    const deleteQuestion = (deleteSuccess, handleQuestionDelete) => {
        const config = {
            questionId,
            auth: auth.value
        }
        
        setIsLoading(true)
        APIs.deleteQuestionByQuestionId(config, (res) => {
            setIsLoading(false)
            if (res.data != undefined && 'result' in res.data) {
                deleteSuccess()
                handleQuestionDelete(currentRoute, classId)
            } else if ('error' in res) { 
                setIsAuthMatch(false)
            }
        })
    }
    
    return { deleteQuestion, isLoading, isAuthMatch }
}

export default useDeleteQuestion
