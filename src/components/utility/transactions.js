import APIs from "./apis";

export const createReview = (classID, reviewInfo, file, setIsUpLoading, done) => {
	const { auth, author } = reviewInfo;
	// if recap is browsed.
	if (file) {
		setIsUpLoading(true);
		// (1) get Presigned URL for upload file to s3.
		APIs.getPresignUploadRecapByRecapID(classID, author, ({ data: recapInfo }) => {
			const { url, tag, recapId } = recapInfo;
			if (url) {
				// (2) use Presigned URL's response upload the file.
				APIs.uploadRecapToS3Storage(url, tag, file, () => {
					setIsUpLoading(false);
					// (3) create review
					APIs.createReview(
						{
							...reviewInfo,
							year: parseInt(reviewInfo.year, 10),
							sec: parseInt(reviewInfo.sec, 10),
							semester: parseInt(reviewInfo.semester, 10),
							recapId,
						},
						({ data }) => {
							const { reviewId, classNameTH, classNameEN } = data;
							// (4) create recap
							APIs.createRecap({ ...recapInfo, reviewId, auth, classNameTH, classNameEN }, () => {
								done(reviewId, classNameTH);
							});
						}
					);
				});
			}
		});
	} else {
		APIs.createReview(
			{
				...reviewInfo,
				year: parseInt(reviewInfo.year, 10),
				sec: parseInt(reviewInfo.sec, 10),
				semester: parseInt(reviewInfo.semester, 10),
			},
			({ data }) => {
				const { reviewId, classNameTH } = data;
				done(reviewId, classNameTH);
			}
		);
	}
};
