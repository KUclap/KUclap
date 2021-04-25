import { route } from "preact-router";

import baseroute from "./baseroute";

export const getDetailFromLabel = (label) => {
	const list = label.split(" ");
	const detailClass = list.slice(0, 2).concat(list.slice(2).join(" "));
	return {
		classID: detailClass[0],
		nameTH: detailClass[1],
		nameEN: detailClass[2] ? detailClass[2].replace("(", "").replace(")", "") : "",
	};
};

export const getClassName = (label) => {
	const labelSplit = label.split(" ");
	let labelName = label;
	if (labelSplit.length > 1) labelSplit.shift();
	labelName = labelSplit.join(" ");
	return labelName;
};

export const getColorHash = (inputString) => {
	let sum = 0;
	for (let i in inputString) {
		sum += inputString.charCodeAt(i);
	}
	let hex = "#";
	hex += `00${(~~(
		`0.${Math.sin(sum + 1)
			.toString()
			.substr(6)}` * 256
	)).toString(16)}`
		.substr(-2, 2)
		.toUpperCase();
	hex += `00${(~~(
		`0.${Math.sin(sum + 2)
			.toString()
			.substr(6)}` * 256
	)).toString(16)}`
		.substr(-2, 2)
		.toUpperCase();
	hex += `00${(~~(
		`0.${Math.sin(sum + 3)
			.toString()
			.substr(6)}` * 256
	)).toString(16)}`
		.substr(-2, 2)
		.toUpperCase();
	return hex;
};

export const navigateToHomePage = () => {
	if (typeof window !== "undefined") window.scrollTo(0, 0);
	route(`${baseroute}/`);
};

export const navigateToClassPage = (classId, fetchTarget) => {
	if (typeof window !== "undefined") window.scrollTo(0, 0);

	if (fetchTarget && fetchTarget !== "review") {
		route(`${baseroute}/${classId}?display=${fetchTarget}`);
	} else {
		route(`${baseroute}/${classId}`);
	}
};

export const navigateToClassPageQuestion = (classId) => {
	if (typeof window !== "undefined") window.scrollTo(0, 0);
	route(`${baseroute}/${classId}?display=question`);
};

export const navigateToReviewPage = (reviewId) => {
	if (typeof window !== "undefined") window.scrollTo(0, 0);
	route(`${baseroute}/review/${reviewId}`);
};

export const navigateToFormReviewPage = (classId) => {
	if (typeof window !== "undefined") window.scrollTo(0, 0);
	route(`${baseroute}/form/create/${classId}`);
};

export const getMobileOS = () => {
	if (typeof window !== undefined) {
		let userAgent = navigator.userAgent || navigator.vendor || window.opera;

		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			return "Windows Phone";
		}

		if (/android/i.test(userAgent)) {
			return "android";
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return "ios";
		}
	}
	return "unknown";
};

export const timeDifference = (date) => {
	const msPerMinute = 60 * 1000;
	const msPerHour = msPerMinute * 60;
	const msPerDay = msPerHour * 24;
	const msPerMonth = msPerDay * 30;
	const msPerYear = msPerDay * 365;

	const hourShift = -7;
	const timestamp = new Date(date).getTime();
	const timeStampDate = new Date(timestamp + hourShift * 60 * 60 * 1000);

	const elapsed = new Date() - timeStampDate;

	if (elapsed < msPerMinute) {
		return `${Math.round(elapsed / 1000)} วินาทีที่ผ่านมา`;
	} else if (elapsed < msPerHour) {
		return `${Math.round(elapsed / msPerMinute)} นาทีที่ผ่านมา`;
	} else if (elapsed < msPerDay) {
		return `${Math.round(elapsed / msPerHour)} ชั่วโมงที่ผ่านมา`;
	} else if (elapsed < msPerMonth) {
		return `${Math.round(elapsed / msPerDay)} วันที่ผ่านมา`;
	} else if (elapsed < msPerYear) {
		return `${Math.round(elapsed / msPerMonth)} เดือนที่ผ่านมา`;
	}
	return `${Math.round(elapsed / msPerYear)} ปีที่ผ่านมา`;
};

const MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

export const parseDate = (date) => {
	const createdAt = new Date(date);
	const hourShift = -7;
	const timestamp = createdAt.getTime();
	const dateTimezone = new Date(timestamp + hourShift * 60 * 60 * 1000);

	let day = dateTimezone.getDate();
	let month = MONTHS[dateTimezone.getMonth()];
	let year = dateTimezone.getFullYear() + 543;

	return `${day} ${month} ${year}`;
}

export const validateAcademicYear = (year) => {
	const today = new Date()
	const monthOfFirstDate = 7
	let academicYear = (today.getFullYear() + 543) - 2500
	if (today.getMonth() < monthOfFirstDate) {
		academicYear -= 1
	} 
	const isAcademicYearValid = (year <= academicYear)
	return isAcademicYearValid
}
