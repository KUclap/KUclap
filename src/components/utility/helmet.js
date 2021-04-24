export const defaultTitle = `KUclap - เว็บไซต์ค้นหาและแบ่งปันรีวิววิชาบูรณาการ มก.`;
export const defaultDescription = `kuclap.com แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ คำถาม คำตอบ สรุป ข้อสอบ แนวข้อสอบ เนื้อหา วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`;
export const defaultImage = `https://www.kuclap.com/static/assets/img/meta-og-image.png`;
export const defaultType = `website`;
export const defaultURL = `https://www.kuclap.com/`;

export const defaultMeta = {
	title: defaultTitle,
	description: defaultDescription,
};

export const OpenGraphMeta = {
	title: defaultTitle,
	description: defaultDescription,
	type: defaultType,
	url: defaultURL,
	image: defaultImage,
};

export const TwitterMeta = {
	title: defaultTitle,
	description: defaultDescription,
	card: `summary_large_image`,
	url: defaultURL,
	image: defaultImage,
};

export const defaultPreRenderingData = {
	...OpenGraphMeta,
	...TwitterMeta,
};

export const getHelmet = (page, subject, review) => {
	switch (page) {
		case "HOME": {
			return {
				title: defaultTitle,
				description: defaultDescription,
				image: defaultImage,
			};
		}
		case "REVIEW":
			return {
				title: getTitle(page, subject, review),
				description: getDescription(page, subject, review),
				image: getImageURL(review),
			};
		case "CLASS":
			return {
				title: getTitle(page, subject, review),
				description: getDescription(page, subject, review),
				image: getImageURL(review),
			};
		default:
			break;
	}
};

export const getTitle = (page, subject, review) => {
	switch (page) {
		case "REVIEW": {
			if (review && subject) {
				return `${review.text} โดย ${review.author} - รีวิววิชา ${subject.nameTH} ${subject.nameEN} (รหัสวิชา ${subject.classID}) มก. - KUclap`;
			} else if (review) {
				return `${review?.text || `กำลังโหลดข้อมูล`} โดย ${review?.author || `กำลังโหลดข้อมูล`} - รีวิววิชา ${
					review.classId
				} มก. - KUclap`;
			} else if (subject) {
				return `ไม่มีข้อมูลรีวิวในระบบ - รีวิววิชา ${subject.nameTH} ${subject.nameEN} (รหัสวิชา ${subject.classID}) มก. - KUclap`;
			}
			return `ไม่มีข้อมูลรีวิวในระบบ - KUclap เว็บไซต์ค้นหาและแบ่งปันรีวิววิชาบูรณาการ มก.`;
		}
		case "CLASS": {
			if (subject) {
				return `รีวิววิชา ${subject.nameTH} ${subject.nameEN} (รหัสวิชา ${subject.classID}) มก. - KUclap`;
			}
			return `ไม่มีข้อมูลวิชาในระบบ - KUclap เว็บไซต์ค้นหาและแบ่งปันรีวิววิชาบูรณาการ มก.`;
		}
		default:
			return defaultTitle;
	}
};

export const getDescription = (page, subject, review) => {
	switch (page) {
		case "REVIEW": {
			if (review && subject) {
				return `${review.text} โดย ${review.author} - รีวิววิชา ${subject.label} ${subject.nameEN} (รหัสวิชา ${subject.classID}) มก. - ${defaultDescription}`;
			} else if (review) {
				return `${review.text} โดย ${review.author} - รีวิววิชา ${review.classId}) มก. - ${defaultDescription}`;
			} else if (subject) {
				return `รีวิววิชา ${subject.nameTH} ${subject.nameEN} (รหัสวิชา ${subject.classID}) มก. - ${defaultDescription}`;
			}
			return defaultDescription;
		}
		case "CLASS": {
			if (subject) {
				return `รีวิววิชา ${subject.nameTH} ${subject.nameEN} (รหัสวิชา ${subject.classID}) มก. - ${defaultDescription}`;
			}
			return defaultDescription;
		}
		default:
			return defaultDescription;
	}
};

export const getImageURL = (review) => {
	if (review) {
		return `https://og-image.kuclap.com/${encodeURIComponent(review.text)}.pngclassId=${
			review.classId
		}&classNameTH=${encodeURIComponent(review.classNameTH)}`;
	}
	return defaultImage;
};
