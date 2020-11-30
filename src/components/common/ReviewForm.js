import { h } from "preact";
import { lazy, Suspense } from 'preact/compat'
import  Checkbox  from "@material-ui/core/Checkbox";
import { useContext, useState, useEffect } from "preact/hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled, { withTheme } from "styled-components";

import { ModalContext } from "../../context/ModalContext";
import { Worst, Bad, So, Good, Excellent } from "../utility/Icons";

import APIs from "../utility/apis";
import { navigateToClassPage } from '../utility/helper'

import ic_cancel_white from "../../assets/icons/ic_cancel_white.svg";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from '@material-ui/core/Radio';

const Alert = lazy(() => import("./Alert"))

const RecommendWords = [ 
  "ต้องแต่งตัวถูกระเบียบ",
  "ไม่เคร่งเรื่องแต่งกาย",
  "ไม่มีเช็คชื่อ",
  "เช็คชื่อทุกคาบ",
  "เหมาะเรียนเป็นกลุ่ม",
  "เนื้อหาง่าย",       
  "เนื้อหาต้องท่องจำ",
  "ไม่มีสอบ"
]
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
`;

const DetailTitle = styled.label`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${(props) => props.theme.mainText};
  display: ${(props) => props.description ? "grid" : "flex"};

  span {
    font-size: 1.2rem;
    color: #bdbdbd;
    font-weight: 500;
  }

  div {
    display: flex;
  }
`;

const RequiredDot = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  margin-left: 0.4rem;
  background: #EEA99A;
  border-radius: 100%;
`

const RecommendReviewContainer = styled.div`
  display: ${props => props.isShow ? "inline-flex" : "none"};
  flex-flow: wrap;
  margin: -1rem 0 2.4rem -1rem;
  transition: all 0.3s ease-in-out;

  > * {
    margin: 1rem 0 0 1rem;
  }
`

const WordTag = styled.button`
  font-size: 1.4rem;
  color: #2F80ED;
  padding: 0.1rem 0.8rem;
  background: #F1F6FE;
  border: 0.1rem solid #2F80ED;
  border-radius: 0.4rem;
  width: fit-content;
`

const Warning = styled(DetailTitle)`
  margin-left: 1.2rem;
  font-size: 1.6rem;
  color: #eb5757;
  display: ${(props) => (props.required ? "inline" : "none")};
  text-align: center;
`;

const FormTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewField = styled.textarea`
  background-color: ${(props) => props.theme.body};
  border: 0.2rem solid ${(props) => props.theme.lightColor};
  border-radius: 1rem;
  padding: 1.2rem 1.6rem;
  height: 14rem;
  font-size: 1.6rem;
  font-family: "Kanit", arial, sans-serif;
  resize: none;
  margin-top: 1.4rem;
  margin-bottom: 2.4rem;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  color: ${(props) => props.theme.bodyText};
  &::placeholder {
    color: ${(props) => props.theme.placeholderText};
  }
`;

const ScoreTitle = styled.p`
  font-size: 1.4rem;
  margin-right: 1.2rem;
  margin: 0;
  color: ${(props) => props.theme.mainText};
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
` 

const GradeButton = styled.div`
  -webkit-tap-highlight-color: transparent;
  color: ${(props) =>
    props.selected === true ? "#2F80ED" : props.theme.placeholderText};
  font-size: 1.6rem;
  border: 0.2rem solid
    ${(props) =>
      props.selected === true ? "#2F80ED" : props.theme.placeholderText};
  height: 3rem;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18%;
  cursor: pointer;

  &:active {
    color: #2f80ed;
    border: 0.2rem solid #2f80ed;
  }

  &:hover {
    color: #9ac1ee;
    border: 0.2rem solid #9ac1ee;
  }

  @media (hover: none) {
    &:hover {
      color: #2f80ed;
      border: 0.2rem solid #2f80ed;
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

const Input = styled.input`
  background-color: ${(props) => props.theme.body};
  border: 0.2rem solid ${(props) => props.theme.lightColor};
  border-radius: 0.6rem;
  height: 3.4rem;
  width: ${(props) => (props.small ? 9 : 20)}rem;
  align-self: ${(props) => (props.small ? "flex-start" : "center")};
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem;
  font-family: "Kanit", arial, sans-serif;
  -webkit-appearance: none;
  color: ${(props) => props.theme.bodyText};
  &::placeholder {
    color: ${(props) => props.theme.placeholderText};
  }
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
      color: #2f80ed;
    }

    .MuiRadio-root {
        color: ${(props) => props.theme.placeholderText}
    }
  }
`

const Caution = styled.div`
  font-size: 1.6rem;
  color: ${(props) => props.theme.mainText};
  font-weight: 500;
  text-align: center;
  align-self: center;
`;

const CopyInputContainer = styled.div`
  width: fit-content;

  input {
    border-radius: 0.6rem 0 0 0.6rem;
    border-right: 0;
  }
`

const PasteButton = styled.button`
  background: #2F80ED;
  border: 0.1rem solid #2F80ED;
  padding: 0.4rem 1.6rem;
  border-radius: 0 0.6rem 0.6rem 0;
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
`

const Button = styled.button`
  font-family: "Kanit", arial, sans-serif;
  ${(props) => props.theme.lightButton}
  background-color: transparent;
  color: #2f80ed;
  border: 1px solid #2f80ed;
  padding: 0.2rem 1.4rem;
  border-radius: 0.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
`;

const ReviewButton = styled(Button)`
  padding: 0.3rem 1.6rem;
  color: white;
  background-color: #2f80ed;
  font-size: 1.8rem;
  align-self: center;
  margin: 1rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
`;

const CancelButton = styled(Button)`
  padding: 0.4rem 1.2rem;
  font-size: 2rem;
  text-align: center;
  margin: 1rem 1rem;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: hsla(10, 10%, 10%, 50%);
  display: ${(props) => (props.show === true ? "block" : "none")};
  z-index: 1;
  cursor: url(${ic_cancel_white}) 205 205, auto;
`;

const Modal = styled.div`
  border: ${(props) =>
    props.theme.name === "dark" ? `0.3rem solid ${props.theme.lightColor}` : 0};
  border-radius: 10px;
  background-color: ${(props) => props.theme.body};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2.8rem 1.2rem;
  font-weight: 500;
  font-size: 2rem;
  line-height: 3.4rem;
  text-align: center;
  display: ${(props) => (props.show === true ? "block" : "none")};
  z-index: 1;
  max-width: 42rem;
  width: 84%;
`;

const ModalActions = styled.div`
  align-self: center;
  padding: 1.4rem 0 0;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
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
      stroke: ${(props) =>
        props.selected === true ? "#2F80ED" : props.theme.placeholderText};
    }

    #eye {
      fill: ${(props) =>
        props.selected === true ? "#2F80ED" : props.theme.placeholderText};
    }
  }

  &:hover {
    svg {
      #outer,
      #mouth {
        stroke: #9ac1ee;
      }

      #eye {
        fill: #9ac1ee;
      }
    }
  }

  &:focus,
  &:active {
    svg {
      #outer,
      #mouth {
        stroke: #2f80ed;
      }

      #eye {
        fill: #2f80ed;
      }
    }
  }

  @media (hover: none) {
    &:hover {
      svg {
        #outer,
        #mouth {
          stroke: #2f80ed;
        }

        #eye {
          fill: #2f80ed;
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
  color: ${(props) => (props.warning ? "#EB5757" : props.theme.mainText)};
  cursor: pointer;

  .MuiSvgIcon-root {
    width: 1.8em;
    height: 1.8em;
  }
  .MuiCheckbox-colorPrimary {
    color: ${(props) => props.theme.bodyText};
  }
  .MuiCheckbox-colorSecondary.Mui-checked {
    color: #2f80ed;
  }
`;

const CheckboxCustom = styled(Checkbox)`
  && {
    &.Mui-checked {
      color: #2f80ed;
    }
  }
`;

const CircularProgressCustom = styled(CircularProgress)`
  && {
    color: white;
  }
`;

// const SemanticText = styled(DetailTitle)`
//   span {
//     color: #9ac1ee;
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

  const { dispatch: dispatchShowModal } = useContext(ModalContext);

  const [isDone, setIsDone] = useState(false);
  const [showReviewModal, setReviewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendWord, setRecommendWord] = useState(false);
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

  const [form, setForm] = useState(initialForm);
  const [checklist, setChecklist] = useState(initialChecklist);
  const [require, setRequire] = useState(initialRequire);
  // const [semantic, setSemantic] = useState('')
  // modal(showReviewModal);

  const handleCloseAlert = () => {
    if (isDone) {
      // back("details");
      navigateToClassPage(classID)
      setIsDone(false);
    }
    setReviewModal(false);
    // modal(false);
    dispatchShowModal({ type: "close" });
  };

  const rate = (item, key) => {
    setForm({ ...form, stats: { ...form.stats, [item.id]: key + 1 } });
  };

  const required = () => {
    let req = { ...require };
    if (
      form.text !== "" &&
      form.author !== "" &&
      form.auth.length == 4 &&
      form.grade !== -1 &&
      form.auth !== "" &&
      form.stats.homework !== -1 &&
      form.stats.how !== -1 &&
      form.stats.interest !== -1 &&
      checklist.rude &&
      checklist.other
    ) {
      setRequire(initialRequire);
      setReviewModal(true);
      // modal(true);
      dispatchShowModal({ type: "open" });
    } else {
      if (form.text === "") req.text = true;
      else req.text = false;
      if (
        form.stats.homework === -1 ||
        form.stats.how === -1 ||
        form.stats.interest === -1
      )
        req.stats = true;
      else req.stats = false;
      if (form.grade === -1) req.grade = true;
      else req.grade = false;
      if (form.author === "") req.author = true;
      else req.author = false;
      if (form.auth.length < 4) req.auth = true;
      else req.auth = false;
      req.rude = !checklist.rude;
      req.other = !checklist.other;
      req.enableReview = true;
      setRequire(req);
    }
  };

  const sendReview = () => {
    if (!isLoading) {
      setIsLoading(true);
      // console.log(form)
      APIs.createReview({
        ...form,
        year: parseInt(form.year, 10),
        sec: parseInt(form.sec, 10),
        semester: parseInt(form.semester, 10)
      }, () => {
        setIsLoading(false);
        setIsDone(true);
        setForm({ ...initialForm, classId: classID });
        setChecklist({ ...initialChecklist });
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
    let review = form.text
    if(review !== "")
      setForm({...form, text: `${review} ${word}`})
    else
      setForm({...form, text: `${word}`})
  }
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
    if(/^[0-9]*$/.test(value)){
      setForm({ ...form, [field]:  value});  
    } else {
      setForm({ ...form });
    }
    
  }
  
  const handleOnchange = (e, field) => {
    let value = e.target.value;
    if (/^\s/.test(value)){
      value = "";
    }
    setForm({ ...form, [field]: value });
  };

  useEffect(() => {
    setForm({ ...initialForm, classID });
    setChecklist({ ...initialChecklist });
  }, [classID]);

  return (
    <Container>
      <FormTitle>
        <DetailTitle for="review-field">
          รีวิววิชานี้
          <RequiredDot />
          <Warning required={require.text}>กรุณากรอกรีวิว</Warning>
        </DetailTitle>
        <Button
          onClick={() => {
            navigateToClassPage(classID)
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
        onFocus={() => {setRecommendWord(true)}}
        tabindex={0}
        id="review-field"
      />
      <RecommendReviewContainer isShow={recommendWord}>
        {
          RecommendWords.map((word, index) => {
            return (
              <WordTag onClick={() => addWordToReview(word)} key={index}>{word}</WordTag>
            )
          })
        }
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
        <DetailTitle for="author-field">
          นามปากกา
          <RequiredDot />
          <Warning required={require.author}>กรุณากรอกนามปากกา</Warning>
        </DetailTitle>
        <Input
          placeholder="ใส่ชื่อผู้เขียน"
          value={form.author}
          onChange={(e) => handleOnchange(e, "author")}
          maxLength={16}
          id="author-field"
        />
      </InputContainer>
      <InputContainer>
        <DetailTitle for="year-field">
          ปีการศึกษาที่เรียน
        </DetailTitle>
        <Input
          small
          placeholder="เช่น 64"
          value={form.year}
          onChange={(e) => handleOnChangeNumberField(e, "year")}
          maxLength={2}
          id="year-field"
        />
      </InputContainer>
      <InputContainer>
        <DetailTitle for="sec-field">
          หมู่เรียน
        </DetailTitle>
        <Input
          small
          placeholder="ใส่เซค"
          value={form.sec}
          onChange={(e) => handleOnChangeNumberField(e, "sec")}
          id="sec-field"
        />
      </InputContainer>
      <InputContainer>
        <DetailTitle for="semester-field">
          เทอม
        </DetailTitle>
        <RadioGroupCustom aria-label="semester" name="semester" value={form.semester} onChange={(e) => handleOnchange(e, "semester")}>
          <FormControlLabel value="1" control={<Radio inputProps={{ 'aria-label': 'semester-1' }} />} label="ต้น" />
          <FormControlLabel value="2" control={<Radio inputProps={{ 'aria-label': 'semester-2' }} />} label="ปลาย" />
          <FormControlLabel value="3" control={<Radio inputProps={{ 'aria-label': 'semester-summer' }} />} label="ฤดูร้อน" />
        </RadioGroupCustom>
      </InputContainer>
      <InputContainer>
        <DetailTitle for="recap-field" description>
          ลิงก์สรุปวิชา
          <span>ควรใส่ลายน้ำเพื่อป้องกันการคัดลอก</span>
        </DetailTitle>
        <Input
          placeholder="วางลิงก์ที่นี่"
          value={form.recap}
          onChange={(e) => handleOnchange(e, "recap")}
          id="recap-field"
        />
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
        <DetailTitle for="pin-field" description>
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
          id="pin-field"
        />
      </InputContainer>
      <Caution>
        กรุณาตรวจสอบความถูกต้องก่อนรีวิว
        <CheckboxContainer
          warning={require.rude}
          onClick={() => setChecklist({ ...checklist, rude: !checklist.rude })}
        >
          <CheckboxCustom inputProps={{ 'aria-label': 'rude-checkbox' }} color="primary" checked={checklist.rude} />
          เนื้อหาไม่มีคำหยาบคาย
        </CheckboxContainer>
        <CheckboxContainer
          warning={require.other}
          onClick={() =>
            setChecklist({ ...checklist, other: !checklist.other })
          }
        >
          <CheckboxCustom inputProps={{ 'aria-label': 'other-checkbox' }} color="primary" checked={checklist.other} />
          เนื้อหาไม่มีการพาดพิงถึงผู้อื่น
        </CheckboxContainer>
      </Caution>
      <Warning required={require.enableReview}>
        กรุณากรอกข้อมูลให้ครบถ้วน
      </Warning>
      <ReviewButton onClick={required}>รีวิวเลย !</ReviewButton>
      <ModalBackdrop show={showReviewModal} onClick={handleCloseAlert} />
      {isDone ? (
        <Suspense>
          <Alert Close={handleCloseAlert} />
        </Suspense>
      ) : (
          <Modal show={showReviewModal}>
          เมื่อกดรีวิวแล้ว จะไม่สามารถแก้ได้
          <div>ต้องการรีวิวเลยใช่หรือไม่ ?</div>
          <ModalActions>
            <CancelButton
              onClick={() => {
                setReviewModal(false);
                // modal(false);
                dispatchShowModal({ type: "close" });
              }}
            >
              กลับไปแก้ไข
            </CancelButton>
            <ReviewButton
              onClick={() => {
                sendReview();
              }}
            >
              {isLoading ? (
                <CircularProgressCustom size="3rem" />
              ) : (
                "รีวิวเลย !"
              )}
            </ReviewButton>
          </ModalActions>
        </Modal>
      )}
    </Container>
  );
};

export default withTheme(ReviewForm);
