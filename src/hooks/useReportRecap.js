import { useState } from 'preact/hooks'
import APIs from '../components/utility/apis'

const useReportRecap = (recapId, classId, reason) => {
    const [isLoading, setIsLoading] = useState(false)

    const sendReport = (reportSuccess) => {
        const report = {
            recapId,
            classId,
            text: reason,
        }
        setIsLoading(true)
        APIs.postRecapReport(report, () => {
            setIsLoading(false)
            reportSuccess()
        })
    }

    return { isLoading, sendReport }
}

export default useReportRecap;
