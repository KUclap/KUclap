export const defaultTitle = `KUclap : เว็บไซต์ค้นหาและแบ่งปันรีวิววิชาบูรณาการ มก.`;
export const defaultDescription = `kuclap.com - แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`;
export const defaultImage = `https://www.kuclap.com/assets/img/meta-og-image.png`;

export const getTitle = (review, subject) =>
  review
    ? `${review.text} โดย ${review.author} - รีวิววิชา ${subject?.nameTH} ${subject?.nameEN} (${subject?.classID}) มก. - KUclap`
    : defaultTitle;

export const getDescription = (review, subject) =>
  review
    ? `${review.text} โดย ${review.author} - รีวิววิชา ${subject?.label} ${subject?.nameEN} (${subject?.classID}) มก.- แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`
    : defaultDescription;

export const getImageURL = (review) =>
  review
    ? `https://og-image.kuclap.com/${encodeURIComponent(
        review.text
      )}.png?classId=${review.classId}&classNameTH=${encodeURIComponent(
        review.classNameTH
      )}`
    : defaultImage;

export const getHelmet = (review, subject) => ({
  title: getTitle(review, subject),
  description: getDescription(review, subject),
  image: getImageURL(review),
});
