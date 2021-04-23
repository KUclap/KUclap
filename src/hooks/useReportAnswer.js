import { useState } from 'preact/hooks'
import APIs from '../components/utility/apis'

const useReportAnswer = (answerId, classId, reason) => {
    const [isLoading, setIsLoading] = useState(false)

    const sendReport = (reportSuccess) => {
        const report = {
            answerId,
            classId,
            text: reason,
        }
        setIsLoading(true)
        APIs.postAnswerReport(report, () => {
            setIsLoading(false)
            reportSuccess()
        })
    }

    return { isLoading, sendReport }
}

export default useReportAnswer;
