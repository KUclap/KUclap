import { readFileSync } from "fs";

const templateHome = { html: readFileSync("./build/index.html", "utf8") };
const templateClass = { html: readFileSync("./build/class/index.html", "utf8") };
const templateReview = { html: readFileSync("./build/review/index.html", "utf8") };

const AppRGX = /<div id="app"[^>]*>.*?(?=<script)/i;

export const InjectTemplateFactory = (page, body, subject, review) => {
	let template = SwitcherTemplate(page, subject, review);
	return appInjection(template, body);
};

const SwitcherTemplate = (page, subject, review) => {
	switch (page) {
		case "HOME":
			return homeInjection();
		case "CLASS":
			return classInjection(subject);
		case "REVIEW":
			return reviewInjection(subject, review);
		default:
			break;
	}
};

const InjectMatch = (template, selector) => {
	selector.map((match) => {
		template.html = template.html.replace(match.RGX, match.data);
	});
};

const CreateMatch = (match, data) => {
	return {
		RGX: new RegExp(`{${match}}`, "g"), // result is /\{match\}/g
		data,
	};
};

const CreateSelector = (dataMapping) => {
	return Object.keys(dataMapping).map((key) => CreateMatch(key, dataMapping[key]));
};

const GlobalStateInjection = (template, subject, review) => {
	const selector = [
		CreateMatch(
			" GLOBAL_STATE ",
			JSON.stringify({
				currentReview: review,
				currentClass: subject,
			})
		),
	];
	InjectMatch(template, selector);
};

const appInjection = (template, body) => {
	return template.html.replace(AppRGX, body);
};

const homeInjection = () => {
	let template = { ...templateHome };
	GlobalStateInjection(template, null, null);
	return template;
};

const classInjection = (subject) => {
	let template = { ...templateClass };
	GlobalStateInjection(template, null, null);

	const dataMapping = {
		CLASS_ID: subject.classId,
		CLASS_NAME_TH: subject.nameTh,
		CLASS_NAME_EN: subject.nameEn,
		CLASS_LABEL: subject.label,
		CLASS_URL: `https://www.kuclap.com/${subject.classId}`,
	};

	let selector = CreateSelector(dataMapping);
	InjectMatch(template, selector);

	return template;
};

const reviewInjection = (subject, review) => {
	let template = { ...templateReview };
	GlobalStateInjection(template, subject, review);

	if (subject && review) {
		const dataMapping = {
			CLASS_ID: subject.classId,
			CLASS_NAME_TH: subject.nameTh,
			CLASS_NAME_EN: subject.nameEn,
			CLASS_LABEL: subject.label,
			REVIEW_URL: `https://www.kuclap.com/review/${review.reviewId}`,
			REVIEW_TEXT: review.text,
			REVIEW_AUTHOR: review.author,
			REVIEW_IMAGE: `https://og-image.kuclap.com/${encodeURIComponent(review.text)}.png?classId=${
				review.classId
			}&classNameTH=${review.classNameTH}`,
		};
		let selector = CreateSelector(dataMapping);
		InjectMatch(template, selector);
	}
	return template;
};
