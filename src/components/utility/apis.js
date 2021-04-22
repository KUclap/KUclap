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
			await api.post(`/review`, payloadReview);
			next();
		} catch (err) {
			console.log(err);
		}
	},

	// GET reviews by classid when class selected
	getReviewsByClassId: async (classid, page, offset, next) => {
		try {
			const res = await api.get(
				`/reviews/${classid}?page=${page}&offset=${offset}`
			);
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
			await api.post(`/report`, payloadReport);
			next();
		} catch (err) {
			console.log(err);
		}
	},

	// PUT report status by reviewid
	putReportByReviewId: async (reviewId, next) => {
		try {
			await api.put(`/review/report/${reviewId}`);
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
			const res = await api.get(
				`/questions/${classID}?page=${page}&offset=${offset}`
			);
			next(res);
		} catch (err) {
			console.log(err);
		}
	},

	// POST answer to question
	answerQuestion: async (payloadAnswer, next) => {
		try {
			console.log(payloadAnswer)
			await api.post(`/answer`, payloadAnswer);
			next();
		} catch (err) {
			console.log(err);
		}
	},

	getAnswersByQuestionId: async (questionID, next) => {
		try {
			const res = await api.get(
				`/answers/${questionID}`
			);
			next(res);
		} catch (err) {
			console.log(err);
		}
	},
};
export default apis;
