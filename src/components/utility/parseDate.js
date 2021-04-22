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


export default function parseDate(date){
  const createdAt = new Date(date)
  const hourShift = -7 
  const timestamp = createdAt.getTime()
  const dateTimezone = new Date(timestamp + (hourShift * 60 * 60 * 1000))

  let day = dateTimezone.getDate()
  let month = MONTHS[dateTimezone.getMonth()]
  let year = dateTimezone.getFullYear() + 543

  return `${day} ${month} ${year}`;
} 