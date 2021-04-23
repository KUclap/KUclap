import { useState } from 'preact/hooks'
import APIs from '../components/utility/apis'

const useReportQuestion = (questionId, classId, reason) => {
    const [isLoading, setIsLoading] = useState(false)

    const sendReport = (reportSuccess) => {
        const report = {
            questionId,
            classId,
            text: reason,
        }
        setIsLoading(true)
        APIs.postQuestionReport(report, () => {
            setIsLoading(false)
            reportSuccess()
        })
    }

    return { isLoading, sendReport }
}

export default useReportQuestion;
