import { h } from "preact";
import { Checkbox } from "@material-ui/core";
import { useState, useEffect } from "preact/hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

import { Worst, Bad, So, Good, Excellent } from "../utillity/Icons";
import Alert from "./Alert";
import APIs from "../utillity/apis";

import ic_cancel_white from "../../assets/icons/ic_cancel_white.svg";

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
  display: ${(props) => (props.isEnable === "form" ? "flex" : "none")};
  flex-direction: column;
  margin: 0 2rem 4rem;
  min-width: 86%;
`;

const DetailTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin: 1.2rem 2rem 1.2rem 0;
  color: #4f4f4f;

  span {
    font-size: 1.6rem;
    color: #bdbdbd;
  }
`;

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
  margin-bottom: 2rem;
`;

const ReviewField = styled.textarea`
  border: 0.2rem solid #e0e0e0;
  border-radius: 1rem;
  padding: 1.2rem 1.6rem;
  height: 14rem;
  font-size: 16px;
  font-family: "Kanit", arial, sans-serif;
  resize: none;
  margin-bottom: 2.8rem;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  &::placeholder {
    color: #bdbdbd;
  }
`;

const ScoreTitle = styled.p`
  font-size: 1.8rem;
  margin-right: 1.2rem;
`;

const ScoreBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GradeButton = styled.div`
  -webkit-tap-highlight-color: transparent;
  color: ${(props) => (props.selected === true ? "#2F80ED" : "#BDBDBD")};
  font-size: 1.6rem;
  border: 0.2rem solid
    ${(props) => (props.selected === true ? "#2F80ED" : "#BDBDBD")};
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
  border: 0.2rem solid #e0e0e0;
  border-radius: 1rem;
  height: 3.4rem;
  width: ${(props) => (props.password ? 9 : 20)}rem;
  margin-top: ${(props) => (props.password ? "1.2rem" : 0)};
  align-self: ${(props) => (props.password ? "flex-start" : "center")};
  padding: 1.2rem 1.6rem;
  font-size: 16px;
  font-family: "Kanit", arial, sans-serif;

  &::placeholder {
    color: #bdbdbd;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  margin: 2rem 0;
`;

const Caution = styled.div`
  font-size: 1.8rem;
  color: #4f4f4f;
  font-weight: 500;
  text-align: center;
  align-self: center;
`;

const Button = styled.button`
  font-family: "Kanit", arial, sans-serif;
  background: rgba(0, 0, 0, 0.64);
  color: #fff;
  padding: 0.2rem 1.8rem;
  border-radius: 0.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  border-width: 0;
  cursor: pointer;
`;

const ReviewButton = styled(Button)`
  padding: 0.4rem 2.4rem;
  width: 12.2rem;
  background-color: #2f80ed;
  font-size: 2rem;
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
  border-radius: 10px;
  background-color: white;
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
  width: 24rem;
  justify-content: space-between;
`;

const RateContainer = styled.div`
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  svg {
    fill: transparent;
    #outer,
    #mouth {
      stroke: ${(props) => (props.selected === true ? "#2F80ED" : "#BDBDBD")};
    }

    #eye {
      fill: ${(props) => (props.selected === true ? "#2F80ED" : "#BDBDBD")};
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
  font-size: 1.8rem;
  align-items: center;
  margin: 1rem 0;
  text-align: left;
  color: ${(props) => (props.warning ? "#EB5757" : "#4F4F4F")};
  cursor: pointer;

  .MuiSvgIcon-root {
    width: 1.8em;
    height: 1.8em;
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

const ReviewForm = (props) => {
  const { enable, back, modal, classId } = props;
  const [isDone, setIsDone] = useState(false);
  const [showReviewModal, setReviewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialForm = {
    classId,
    text: "",
    author: "",
    grade: -1,
    auth: "",
    stats: {
      how: -1,
      homework: -1,
      interest: -1,
    },
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
  // modal(showReviewModal);

  const handleCloseAlert = () => {
    if (isDone) {
      back("details");
      setIsDone(false);
    }
    setReviewModal(false);
    modal(false);
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
      modal(true);
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
      APIs.createReview(form, () => {
        setIsLoading(false);
        setIsDone(true);
        setForm({ ...initialForm, classId });
        setChecklist({ ...initialChecklist });
        // back("details");
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

  const handleOnchange = (e, field) => {
    let value = e.target.value;
    if (/^\s/.test(value)) {
      value = "";
    }
    setForm({ ...form, [field]: value });
  };

  useEffect(() => {
    setForm({ ...initialForm, classId });
    setChecklist({ ...initialChecklist });
  }, [classId]);

  return (
    <Container isEnable={enable}>
      <FormTitle>
        <DetailTitle>
          รีวิววิชานี้
          <Warning required={require.text}>กรุณากรอกรีวิว</Warning>
        </DetailTitle>
        <Button
          onClick={() => {
            if (typeof window !== "undefined") window.scrollTo(0, 0);
            back("details");
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
      />
      <DetailTitle>
        ให้คะแนนความพอใจวิชา
        <Warning required={require.stats}>กรุณาเลือกทุกหัวข้อ</Warning>
      </DetailTitle>
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
                <Rate />
              </RateContainer>
            ))}
          </Rating>
        </ScoreBar>
      ))}
      <InputContainer>
        <DetailTitle>
          เกรดที่ได้
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
        <DetailTitle>
          นามปากกา
          <Warning required={require.author}>กรุณากรอกนามปากกา</Warning>
        </DetailTitle>
        <Input
          placeholder="ใส่ชื่อผู้เขียน"
          value={form.author}
          onChange={(e) => handleOnchange(e, "author")}
          maxLength={16}
        />
      </InputContainer>
      <InputContainer>
        <DetailTitle>
          ตัวเลข 4 หลัก
          <Warning required={require.auth}>กรุณากรอกเลข 4 หลัก</Warning> <br />
          <span>เพื่อใช้แก้ไขรีวิวในภายหลัง</span>
        </DetailTitle>
        <Input
          password
          type="text"
          placeholder="ใส่เลข"
          value={form.auth}
          onChange={handleOnChangePassword}
        />
      </InputContainer>
      <Caution>
        กรุณาตรวจสอบความถูกต้องก่อนรีวิว
        <CheckboxContainer
          warning={require.rude}
          onClick={() => setChecklist({ ...checklist, rude: !checklist.rude })}
        >
          <CheckboxCustom color="primary" checked={checklist.rude} />
          เนื้อหาไม่มีคำหยาบคาย
        </CheckboxContainer>
        <CheckboxContainer
          warning={require.other}
          onClick={() =>
            setChecklist({ ...checklist, other: !checklist.other })
          }
        >
          <CheckboxCustom color="primary" checked={checklist.other} />
          เนื้อหาไม่มีการพาดพิงถึงผู้อื่น
        </CheckboxContainer>
      </Caution>
      <Warning required={require.enableReview}>
        กรุณากรอกข้อมูลให้ครบถ้วน
      </Warning>
      <ReviewButton onClick={required}>รีวิวเลย !</ReviewButton>
      <ModalBackdrop show={showReviewModal} onClick={handleCloseAlert} />
      {isDone ? (
        <Alert Close={handleCloseAlert} />
      ) : (
        <Modal show={showReviewModal}>
          เมื่อกดรีวิวแล้ว จะไม่สามารถแก้ได้
          <div>ต้องการรีวิวเลยใช่หรือไม่ ?</div>
          <ModalActions>
            <CancelButton
              onClick={() => {
                setReviewModal(false);
                modal(false);
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

export default ReviewForm;
