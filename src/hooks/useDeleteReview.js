import { useState } from 'preact/hooks'
import APIs from '../components/utility/apis'

const useDeleteReview = (reviewId, auth, currentRoute, classId) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isAuthMatch, setIsAuthMatch] = useState(true)

	const deleteReview = (deleteSuccess, handleReviewDelete) => {
		const config = {
			reviewId,
			auth: auth.value
		}
		
		setIsLoading(true)
		APIs.deleteReviewByReviewId(config, (res) => {
			setIsLoading(false)
			if (res.data != undefined && 'result' in res.data) {
				deleteSuccess()
				handleReviewDelete(currentRoute, classId)
			} else if ('error' in res) { 
				setIsAuthMatch(false)
			}
		})
	}
	
	return { deleteReview, isLoading, isAuthMatch }
}

export default useDeleteReview
