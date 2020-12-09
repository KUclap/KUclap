const MONTHS = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
]


export default function parseDate(dateUTC){
  let date = new Date(dateUTC)

  let day = date.getDate()
  let month = MONTHS[date.getMonth()]
  let year = date.getFullYear() + 543

  return `${day} ${month} ${year}`;
} 