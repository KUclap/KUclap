import { useState } from 'preact/hooks'
import APIs from '../components/utility/apis'

const useReportReview = (reviewId, classId, reason) => {
    const [isLoading, setIsLoading] = useState(false)

    const sendReport = (reportSuccess) => {
        const report = {
            reviewId,
            classId,
            text: reason,
        }
        setIsLoading(true)
        APIs.createReportReview(report, () => {
            setIsLoading(false)
            reportSuccess()
        })
    }

    return { isLoading, sendReport }
}

export default useReportReview;
