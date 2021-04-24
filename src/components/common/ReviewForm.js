import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { h } from "preact";
import { lazy, Suspense } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import styled, { withTheme } from "styled-components";

import { navigateToClassPage } from "../utility/helper";
import { Bad, Excellent, Good, So, Worst } from "../utility/Icons";
import * as TRANSACTIONs from "../utility/transactions";
import BrowseButton from "./BrowseButton";
// import { blue, blue_75, blue_97, grey_75, red, turquoise_green } from "./Colors";
import { blue, blue_75, blue_97, grey_75, red, turquoise_green } from "./Colors";
import {
	BodySmall,
	Heading1,
	Input,
	ModalActions,
	PrimaryButton,
	RequiredDot,
	SecondaryButton,
	TextArea,
	WhiteCircularProgress,
} from "./DesignSystemStyles";
import Modal from "./Modal";

const Alert = lazy(() => import("./Alert"));

const RecommendWords = [
	"ต้องแต่งตัวถูกระเบียบ",
	"ไม่เคร่งเรื่องแต่งกาย",
	"ไม่มีเช็คชื่อ",
	"เช็คชื่อทุกคาบ",
	"เหมาะเรียนเป็นกลุ่ม",
	"เนื้อหาง่าย",
	"เนื้อหาต้องท่องจำ",
	"ไม่มีสอบ",
];
const Grade = ["A", "B+", "B", "C+", "C", "D+", "D", "F"];
const Rate = [
	{
		id: "homework",
		title: "จำนวนงานและการบ้าน",
	},
	{
		id: "interest",
		title: "ความน่าสนใจของเนื้อหา",
	},
	{
		id: "how",
		title: "การสอนของอาจารย์",
	},
];
const RateIcon = [Worst, Bad, So, Good, Excellent];

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 3rem 4rem;
	width: 86%;

	${Input} {
		width: ${(props) => (props.small ? 9 : 20)}rem;
		align-self: ${(props) => (props.small ? "flex-start" : "center")};
	}
`;

const DetailTitle = styled(Heading1)`
	display: ${(props) => (props.description ? "grid" : "flex")};

	span {
		font-size: 1.2rem;
		color: ${grey_75};
		font-weight: 500;
	}

	div {
		display: flex;
	}
`;

const RecommendReviewContainer = styled.div`
	display: ${(props) => (props.isShow ? "inline-flex" : "none")};
	flex-flow: wrap;
	margin: -1rem 0 2.4rem -1rem;
	transition: all 0.3s ease-in-out;

	> * {
		margin: 1rem 0 0 1rem;
	}
`;

const WordTag = styled.button`
	font-size: 1.4rem;
	color: ${(props) => props.theme.tag.fontColor};
	padding: 0.1rem 0.8rem;
	background: ${(props) => props.theme.tag.background};
	border: 0.1rem solid ${(props) => props.theme.tag.border};
	border-radius: 0.4rem;
	width: fit-content;
	cursor: pointer;

	&:hover {
		background: ${(props) => props.theme.tag.hover};
	}
`;

const Warning = styled(DetailTitle)`
	margin-left: 1.2rem;
	font-size: 1.6rem;
	color: ${red};
	display: ${(props) => (props.required ? "inline" : "none")};
	text-align: center;
`;

const FormTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ReviewField = styled(TextArea)`
	height: 14rem;
	margin-top: 1.4rem;
	margin-bottom: 2.4rem;
	resize: vertical;
`;

const ScoreTitle = styled(BodySmall)`
	margin-right: 1.2rem;
`;

const ScoreBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	&:not(:first-child) {
		margin-top: 1.6rem;
	}
`;

const ScoreContainer = styled.div`
	margin-top: 1.4rem;
	margin-bottom: 2.4rem;
`;

const GradeButton = styled.div`
	-webkit-tap-highlight-color: transparent;
	color: ${(props) => (props.selected === true ? blue : props.theme.subText)};
	font-size: 1.6rem;
	border: 0.2rem solid ${(props) => (props.selected === true ? blue : props.theme.subText)};
	height: 3rem;
	width: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 18%;
	cursor: pointer;

	&:active {
		color: ${blue};
		border: 0.2rem solid ${blue};
	}

	&:hover {
		color: ${blue_75};
		border: 0.2rem solid ${blue_75};
	}

	@media (hover: none) {
		&:hover {
			color: ${blue};
			border: 0.2rem solid ${blue};
		}
	}

	p {
		margin: 0;
		line-height: 0.9rem;
	}
`;

const GradeBar = styled.div`
	display: flex;
	width: 100%;
	max-width: 46rem;
	justify-content: space-between;
`;

const InputContainer = styled.div`
	display: inline-flex;
	flex-flow: wrap;
	align-items: center;
	margin: -1.2rem 0 3rem -1.9rem;

	> * {
		margin: 1.2rem 0 0 1.9rem;
	}
`;

const TextStatusCreatingReview = styled(BodySmall)`
	color: ${turquoise_green};
`;
const RadioGroupCustom = styled(RadioGroup)`
	&.MuiFormGroup-root {
		flex-direction: row;

		.MuiTypography-body1 {
			font-family: "Kanit";
			font-size: 1.6rem;
			color: ${(props) => props.theme.mainText};
			font-weight: 500;
		}

		.MuiSvgIcon-root {
			height: 20px;
			width: 20px;
		}

		.MuiRadio-colorSecondary.Mui-checked {
			color: ${blue};
		}

		.MuiRadio-root {
			color: ${(props) => props.theme.subText};

			&:hover {
				background-color: ${blue_97};
			}
		}
	}
`;

const Caution = styled.div`
	margin-bottom: 2rem;
	font-size: 1.6rem;
	color: ${(props) => props.theme.mainText};
	font-weight: 500;
	text-align: center;
	align-self: center;
`;

// const CopyInputContainer = styled.div`
//   width: fit-content;

//   input {
//     border-radius: 0.6rem 0 0 0.6rem;
//     border-right: 0;
//   }
// `

// const PasteButton = styled.button`
//   background:  ${blue};
//   border: 0.1rem solid  ${blue};
//   padding: 0.4rem 1.6rem;
//   border-radius: 0 0.6rem 0.6rem 0;
//   color: white;
//   font-size: 1.6rem;
//   cursor: pointer;
// `

const Button = styled(SecondaryButton)`
	padding: 0.2rem 1.4rem;
	font-size: 1.4rem;
`;

const Rating = styled.div`
	display: flex;
	width: 18rem;
	justify-content: space-between;
`;

const RateContainer = styled.div`
	cursor: pointer;
	user-select: none;
	-webkit-tap-highlight-color: transparent;

	svg {
		width: 3rem;
		height: 3rem;
		fill: transparent;
		#outer,
		#mouth {
			stroke: ${(props) => (props.selected === true ? blue : props.theme.subText)};
		}

		#eye {
			fill: ${(props) => (props.selected === true ? blue : props.theme.subText)};
		}
	}

	&:hover {
		svg {
			#outer,
			#mouth {
				stroke: ${blue_75};
			}

			#eye {
				fill: ${blue_75};
			}
		}
	}

	&:focus,
	&:active {
		svg {
			#outer,
			#mouth {
				stroke: ${blue};
			}

			#eye {
				fill: ${blue};
			}
		}
	}

	@media (hover: none) {
		&:hover {
			svg {
				#outer,
				#mouth {
					stroke: ${blue};
				}

				#eye {
					fill: ${blue};
				}
			}
		}
	}
`;

const CheckboxContainer = styled.div`
	display: flex;
	font-size: 1.6rem;
	align-items: center;
	text-align: left;
	color: ${(props) => (props.warning ? red : props.theme.mainText)};
	cursor: pointer;

	.MuiSvgIcon-root {
		width: 1.8em;
		height: 1.8em;
	}

	.MuiCheckbox-colorPrimary {
		color: ${(props) => props.theme.mainText};

		&:hover {
			background-color: ${blue_97};
		}
	}

	.MuiCheckbox-colorSecondary.Mui-checked {
		color: ${blue};
	}
`;

const CheckboxCustom = styled(Checkbox)`
	&& {
		&.Mui-checked {
			color: ${blue};
		}
	}
`;

// const SemanticText = styled(DetailTitle)`
//   span {
//     color: ${blue_75};
//   }
// `

// function Debounce(func, wait, immediate){
//   var timeout;
//   return function() {
//     var context = this, args = arguments;
//     var later = function() {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };
//     var callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   }
// }

const ReviewForm = (props) => {
	const { classID } = props;

	const [isDone, setIsDone] = useState(false);
	const [showReviewModal, setReviewModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpLoading, setIsUpLoading] = useState(false);
	const [recommendWord, setRecommendWord] = useState(false);
	const [file, setFile] = useState(null);
	const initialForm = {
		classId: classID,
		text: "",
		author: "",
		grade: -1,
		auth: "",
		stats: {
			how: -1,
			homework: -1,
			interest: -1,
		},
		year: "",
		sec: "",
		semester: "",
		recap: "",
	};
	const initialChecklist = {
		rude: false,
		other: false,
	};
	const initialRequire = {
		enableReview: false,
		text: false,
		stats: false,
		grade: false,
		author: false,
		auth: false,
		rude: false,
		other: false,
	};

	const [timeId, setTimeId] = useState(null);
	const [form, setForm] = useState(initialForm);
	const [checklist, setChecklist] = useState(initialChecklist);
	const [require, setRequire] = useState(initialRequire);
	// const [semantic, setSemantic] = useState('')
	// modal(showReviewModal);

	const handleCloseAlert = () => {
		if (isDone) {
			// back("details");
			navigateToClassPage(classID);
			setIsDone(false);
		}
		setReviewModal(false);
	};

	const rate = (item, key) => {
		setForm({ ...form, stats: { ...form.stats, [item.id]: key + 1 } });
	};

	const required = () => {
		let req = { ...require };
		const AreAllInputsValid =
			form.text !== "" &&
			form.author !== "" &&
			form.auth.length == 4 &&
			form.grade !== -1 &&
			form.auth !== "" &&
			form.stats.homework !== -1 &&
			form.stats.how !== -1 &&
			form.stats.interest !== -1 &&
			checklist.rude &&
			checklist.other;
		const isReviewEmpty = form.text === "";
		const isAllStatsNotSelected = form.stats.homework === -1 || form.stats.how === -1 || form.stats.interest === -1;
		const isGradeNotSelected = form.grade === -1;
		const isAuthorEmpty = form.author === "";
		const isAuthTooShort = form.auth.length < 4;
		if (AreAllInputsValid) {
			setRequire(initialRequire);
			setReviewModal(true);
		} else {
			req.text = isReviewEmpty;
			req.stats = isAllStatsNotSelected;
			req.grade = isGradeNotSelected;
			req.author = isAuthorEmpty;
			req.auth = isAuthTooShort;
			req.rude = !checklist.rude;
			req.other = !checklist.other;
			req.enableReview = true;
			setRequire(req);
		}
	};

	const sendReview = () => {
		if (!isLoading) {
			setIsLoading(true);
			localStorage.setItem(`kuclap.com-v1-author`, form.author);
			TRANSACTIONs.createReview(classID, form, file, setIsUpLoading, () => {
				setIsLoading(false);
				setIsDone(true);
				setForm({ ...initialForm, classId: classID });
				setChecklist({ ...initialChecklist });

				localStorage.removeItem(`kuclap.com-v1-classid-${classID}`);
			});
		}
	};

	const handleOnChangePassword = (e) => {
		const newForm = { ...form };
		if (/^[0-9]*$/.test(e.target.value) && e.target.value.length <= 4) {
			newForm.auth = e.target.value;
		}
		setForm(newForm);
	};

	// const pasteURL = () => {
	//   const pasteTarget = document.getElementById("recap-field");
	//   navigator.clipboard.readText().then(clipText => {
	//     pasteTarget.value = clipText
	//     setForm({...form, recap: clipText })
	//   });
	// }

	const addWordToReview = (word) => {
		let review = form.text;
		if (review !== "") setForm({ ...form, text: `${review} ${word}` });
		else setForm({ ...form, text: `${word}` });
	};

	// const postSetiment = async (value) => {
	//   try {
	//     const res = await axios.post("https://model-datamining.herokuapp.com/predict", {
	//       text: value
	//     })
	//     console.log(res)
	//     setSemantic(res.data.result.type)
	//   } catch (error) {
	//     console.log(error)
	//   }
	// }

	const handleOnChangeNumberField = (e, field) => {
		let value = e.target.value;
		if (/^[0-9]*$/.test(value)) {
			setForm({ ...form, [field]: value });
		} else {
			setForm({ ...form });
		}
	};

	const handleOnchange = (e, field) => {
		let value = e.target.value;
		if (/^\s/.test(value)) {
			value = form[field];
		}
		setForm({ ...form, [field]: value });
	};

	const autoSave = () => {
		if (timeId !== null) clearTimeout(timeId);
		const timer = () =>
			setTimeout(() => {
				localStorage.setItem(`kuclap.com-v1-classid-${classID}`, form.text);
				setTimeId(null);
			}, 2500);
		const id = timer();
		setTimeId(id);
	};

	useEffect(() => {
		setForm({ ...initialForm, classID });
		setChecklist({ ...initialChecklist });
	}, [classID]);

	useEffect(() => {
		if (form.text != "") autoSave();
	}, [form.text]);

	useEffect(() => {
		if (localStorage.getItem(`kuclap.com-v1-classid-${classID}`)) {
			setForm({ ...form, text: localStorage.getItem(`kuclap.com-v1-classid-${classID}`) });
		}
		if (localStorage.getItem(`kuclap.com-v1-author`)) {
			setForm({ ...form, author: localStorage.getItem(`kuclap.com-v1-author`) });
		}
	}, []);

	return (
		<Container>
			<FormTitle>
				<DetailTitle id="review-field">
					รีวิววิชานี้
					<RequiredDot />
					<Warning required={require.text}>กรุณากรอกรีวิว</Warning>
				</DetailTitle>
				<Button
					onClick={() => {
						navigateToClassPage(classID);
					}}
				>
					ย้อนกลับ
				</Button>
			</FormTitle>
			<ReviewField
				type="textarea"
				placeholder="เขียนรีวิว..."
				value={form.text}
				onChange={(e) => handleOnchange(e, "text")}
				onFocus={() => {
					setRecommendWord(true);
				}}
				tabindex={0}
				aria-labelledby="review-field"
			/>
			<RecommendReviewContainer isShow={recommendWord}>
				{RecommendWords.map((word, index) => {
					return (
						<WordTag onClick={() => addWordToReview(word)} key={index}>
							{word}
						</WordTag>
					);
				})}
			</RecommendReviewContainer>
			{/* <SemanticText>รีวิวนี้มีความหมายในเชิง : <span>{semantic.toUpperCase() || "กรุณาพิมพ์รีวิวก่อน..."}</span></SemanticText> */}
			<DetailTitle>
				ให้คะแนนความพอใจวิชา
				<RequiredDot />
				<Warning required={require.stats}>กรุณาเลือกทุกหัวข้อ</Warning>
			</DetailTitle>
			<ScoreContainer>
				{Rate.map((item, key) => (
					<ScoreBar key={key}>
						<ScoreTitle>{item.title}</ScoreTitle>
						<Rating>
							{RateIcon.map((Rate, key_rate) => (
								<RateContainer
									key={key_rate}
									onClick={(e) => {
										e.preventDefault();
										rate(item, key_rate);
									}}
									selected={form.stats[item.id] - 1 === key_rate}
								>
									<Rate bgColor={props.theme.body} />
								</RateContainer>
							))}
						</Rating>
					</ScoreBar>
				))}
			</ScoreContainer>
			<InputContainer>
				<DetailTitle>
					เกรดที่ได้
					<RequiredDot />
					<Warning required={require.grade}>กรุณาเลือกเกรด</Warning>
				</DetailTitle>
				<GradeBar>
					{Grade.map((item, key) => (
						<GradeButton
							onClick={(e) => {
								e.preventDefault();
								setForm({ ...form, grade: item });
							}}
							key={key}
							selected={form.grade === item}
						>
							<p>{item}</p>
						</GradeButton>
					))}
				</GradeBar>
			</InputContainer>
			<InputContainer>
				<DetailTitle id="author-field">
					นามปากกา
					<RequiredDot />
					<Warning required={require.author}>กรุณากรอกนามปากกา</Warning>
				</DetailTitle>
				<Input
					placeholder="ใส่ชื่อผู้เขียน"
					value={form.author}
					onChange={(e) => handleOnchange(e, "author")}
					maxLength={16}
					aria-labelledby="author-field"
				/>
			</InputContainer>
			<InputContainer>
				<DetailTitle id="year-field">ปีการศึกษาที่เรียน</DetailTitle>
				<Input
					small
					placeholder="เช่น 64"
					value={form.year}
					onChange={(e) => handleOnChangeNumberField(e, "year")}
					maxLength={2}
					aria-labelledby="year-field"
				/>
			</InputContainer>
			<InputContainer>
				<DetailTitle id="sec-field">หมู่เรียน</DetailTitle>
				<Input
					small
					placeholder="ใส่เซค"
					value={form.sec}
					onChange={(e) => handleOnChangeNumberField(e, "sec")}
					aria-labelledby="sec-field"
				/>
			</InputContainer>
			<InputContainer>
				<DetailTitle id="semester-field">เทอม</DetailTitle>
				<RadioGroupCustom
					aria-label="semester"
					name="semester"
					value={form.semester}
					onChange={(e) => handleOnchange(e, "semester")}
				>
					<FormControlLabel
						value="1"
						control={<Radio inputProps={{ "aria-label": "semester-1" }} />}
						label="ต้น"
					/>
					<FormControlLabel
						value="2"
						control={<Radio inputProps={{ "aria-label": "semester-2" }} />}
						label="ปลาย"
					/>
					<FormControlLabel
						value="3"
						control={<Radio inputProps={{ "aria-label": "semester-summer" }} />}
						label="ฤดูร้อน"
					/>
				</RadioGroupCustom>
			</InputContainer>
			<InputContainer>
				<DetailTitle id="recap-field" description>
					ลิงก์สรุปวิชา
					<span>ควรใส่ลายน้ำเพื่อป้องกันการคัดลอก</span>
				</DetailTitle>
				<BrowseButton file={file} setFile={setFile} />
				{/* <Button
					onClick={() => {
						navigateToClassPage(classID);
					}}
				>
					เลือกไฟล์
				</Button> */}
				{/* <Input
					placeholder="วางลิงก์ที่นี่"
					value={form.recap}
					onChange={(e) => handleOnchange(e, "recap")}
					aria-labelledby="recap-field"
				/> */}
				{/* <CopyInputContainer>
          <Input
            type="text"
            placeholder="วางลิงก์ที่นี่หรือกดปุ่มวาง"
            value={form.recap}
            onChange={(e) => handleOnchange(e, "recap")}
            id="recap-field"
          />
          <PasteButton onClick={pasteURL}>วาง</PasteButton>
        </CopyInputContainer> */}
			</InputContainer>
			<InputContainer>
				<DetailTitle id="pin-field" description>
					<div>
						ตัวเลข 4 หลัก
						<RequiredDot />
					</div>
					<Warning required={require.auth}>กรุณากรอกเลข 4 หลัก</Warning>
					<span>เพื่อใช้ลบรีวิวในภายหลัง</span>
				</DetailTitle>
				<Input
					small
					type="text"
					placeholder="ใส่เลข"
					value={form.auth}
					onChange={handleOnChangePassword}
					aria-labelledby="pin-field"
				/>
			</InputContainer>
			<Caution>
				กรุณาตรวจสอบความถูกต้องก่อนรีวิว
				<CheckboxContainer
					warning={require.rude}
					onClick={() => setChecklist({ ...checklist, rude: !checklist.rude })}
				>
					<CheckboxCustom
						inputProps={{ "aria-label": "rude-checkbox" }}
						color="primary"
						checked={checklist.rude}
					/>
					เนื้อหาไม่มีคำหยาบคาย
				</CheckboxContainer>
				<CheckboxContainer
					warning={require.other}
					onClick={() => setChecklist({ ...checklist, other: !checklist.other })}
				>
					<CheckboxCustom
						inputProps={{ "aria-label": "other-checkbox" }}
						color="primary"
						checked={checklist.other}
					/>
					เนื้อหาไม่มีการพาดพิงถึงผู้อื่น
				</CheckboxContainer>
			</Caution>
			<Warning required={require.enableReview}>กรุณากรอกข้อมูลให้ครบถ้วน</Warning>
			<PrimaryButton onClick={required}>รีวิวเลย !</PrimaryButton>
			{isDone ? (
				<Suspense>
					<Alert Close={handleCloseAlert} />
				</Suspense>
			) : (
				<Modal showModal={showReviewModal} closeModal={handleCloseAlert}>
					เมื่อกดรีวิวแล้ว จะไม่สามารถแก้ได้
					<div>ต้องการรีวิวเลยใช่หรือไม่ ?</div>
					{isLoading && !isUpLoading && (
						<TextStatusCreatingReview>สถานะ: กำลังสร้างรีวิวของคุณ...</TextStatusCreatingReview>
					)}
					{isUpLoading && (
						<TextStatusCreatingReview>สถานะ: กำลังอัพโหลดไฟล์สรุปของคุณ...</TextStatusCreatingReview>
					)}
					<ModalActions>
						<SecondaryButton
							onClick={() => {
								setReviewModal(false);
							}}
						>
							กลับไปแก้ไข
						</SecondaryButton>
						<PrimaryButton onClick={sendReview}>
							{isLoading ? <WhiteCircularProgress size="2rem" /> : "รีวิวเลย !"}
						</PrimaryButton>
					</ModalActions>
				</Modal>
			)}
		</Container>
	);
};

export default withTheme(ReviewForm);
