import axios from "axios";

const URL_API = process.env.URL_API;

const api = axios.create({
	baseURL: URL_API,
});

const apis = {
	// GET tail reviews when user load page.
	getLastReviews: async (page, offset, next) => {
		try {
			const res = await api.get(`/reviews/last?page=${page}&offset=${offset}`);
			next(res);
		} catch (err) {
			console.log(err);
		}
	},

	// GET data classes when componentwillmount (on hook).
	getAllClasses: async (next) => {
		try {
			const res = await api.get(`/classes`);
			next(res);
		} catch (err) {
			console.log(err);
		}
	},

	// GET stats when class selected.
	getClassDetailByClassId: async (classid, next) => {
		try {
			const res = await api.get(`/class/${classid}`);
			next(res);
		} catch (err) {
			console.log(err);
		}
	},

	// POST & PUT create review then update stats class
	createReview: async (payloadReview, next) => {
		try {
			const res = await api.post(`/review`, payloadReview);
			next(res);
		} catch (err) {
			console.log(err);
		}
	},

	// GET reviews by classid when class selected
	getReviewsByClassId: async (classid, page, offset, next) => {
		try {
			const res = await api.get(`/reviews/${classid}?page=${page}&offset=${offset}`);
			next(res);
		} catch (err) {
			console.log(err);
		}
	},

	// GET review by reviewID
	getReviewByReviewID: async (reviewID, next, reject) => {
		try {
			const res = await api.get(`/review/${reviewID}`);
			next(res);
		} catch (err) {
			reject();
			console.log(err);
		}
	},

	// POST report review by reviewid
	createReportReview: async (payloadReport, next) => {
		try {
			await api.post(`/review/report`, payloadReport);
			next();
		} catch (err) {
			console.log(err);
		}
	},

	// PUT clap review by reviewid
	putClapReviewByReviewId: async (reviewid, clap, next) => {
		try {
			await api.put(`/review/clap/${reviewid}/${clap}`);
			next();
		} catch (err) {
			console.log(err);
		}
	},

	// PUT boo review by reviewid
	putBooReviewByReviewId: async (reviewid, boo, next) => {
		try {
			await api.put(`/review/boo/${reviewid}/${boo}`);
			next();
		} catch (err) {
			console.log(err);
		}
	},

	// DELETE review by reviewid
	deleteReviewByReviewId: async (config, next) => {
		try {
			const res = await api.delete(`/review/${config.reviewId}`, {
				headers: {
					Authorization: `Bearer ${config.auth}`,
				},
			});
			next(res);
		} catch (err) {
			console.log(err.response.data);
			next(err.response.data);
		}
	},

	// POST question
	createQuestion: async (payloadQuestion, next) => {
		try {
			await api.post(`/question`, payloadQuestion);
			next();
		} catch (err) {
			console.log(err);
		}
	},

	// GET question by classID
	getQuestionsByClassId: async (classID, page, offset, next) => {
		try {
			const res = await api.get(`/questions/${classID}?page=${page}&offset=${offset}`);
			next(res);
		} catch (err) {
			console.log(err);
		}
	},
	// POST answer to question
	answerQuestion: async (payloadAnswer, next) => {
		try {
			console.log(payloadAnswer);
			await api.post(`/answer`, payloadAnswer);
			next();
		} catch (err) {
			console.log(err);
		}
	},

	getAnswersByQuestionId: async (questionId, next) => {
		try {
			const res = await api.get(`/answers/${questionId}`);
			next(res);
		} catch (err) {
			console.log(err);
		}
	},

	postQuestionReport: async (reportPayload, next) => {
		try {
			await api.post(`/question/report`, reportPayload);
			next();
		} catch (err) {
			console.log(err);
		}
	},

	deleteQuestionByQuestionId: async (config, next) => {
		try {
			const res = await api.delete(`/question/${config.questionId}`, {
				headers: {
					Authorization: `Bearer ${config.auth}`,
				},
			});
			next(res);
		} catch (err) {
			console.log(err.response.data);
			next(err.response.data);
		}
	},

	postAnswerReport: async (reportPayload, next) => {
		try {
			await api.post(`/answer/report`, reportPayload);
			next();
		} catch (err) {
			console.log(err);
		}
	},

	getRecapsByClassId: async (classID, page, offset, next) => {
		try {
			const res = await api.get(
				`/recaps/${classID}?page=${page}&offset=${offset}`
			);
			next(res);
		} catch (err) {
			console.log(err);
		}
	},

	postRecapReport: async (reportPayload, next) => {
		try {
			await api.post(`/recap/report`, reportPayload);
			next();
		} catch (err) {
			console.log(err);
		}
	},

	deleteRecapByRecapId: async (config, next) => {
		try {
			const res = await api.delete(`/recap/${config.recapId}`, {
				headers: {
					Authorization: `Bearer ${config.auth}`,
				},
			});
			next(res);
		} catch (err) {
			console.log(err.response.data);
			next(err.response.data);
		}
	},
	
	// GET presigned url for download recap
	getPresignDownloadRecapByRecapID: async (recapID /* , next */) => {
		if (typeof window !== "undefined") {
			window.open(`${URL_API}/recap/presigned/download/${recapID}`, "_blank").focus();
		}
	},

	// GET presigned url for upload recap
	getPresignUploadRecapByRecapID: async (classID, author, next) => {
		try {
			const res = await api.get(`/recap/presigned/upload/${classID}?author=${author}`);
			next(res);
		} catch (error) {
			console.log(error);
		}
	},

	// PUT upload recap file to S3
	uploadRecapToS3Storage: async (presignedURL, tag, file, next) => {
		try {
			await api.put(presignedURL, file, {
				headers: {
					"Content-Type": file.type,
					"x-amz-tagging": tag,
				},
			});

			next();
		} catch (error) {
			console.log(error);
		}
	},

	// POST create recap
	createRecap: async (payloadRecap, next) => {
		try {
			await api.post(`/recap/upload`, payloadRecap);
			next();
		} catch (err) {
			console.log(err);
		}
	},

	getLastQuestions: async (page, offset, next) => {
		try {
			const res = await api.get(`/questions/last?page=${page}&offset=${offset}`);
			next(res);
		} catch (err) {
			console.log(err);
		}
	},

	getLastRecaps: async (page, offset, next) => {
		try {
			const res = await api.get(`/recaps/last?page=${page}&offset=${offset}`);
			next(res);
		} catch (err) {
			console.log(err);
		}
	},
};

export default apis;
