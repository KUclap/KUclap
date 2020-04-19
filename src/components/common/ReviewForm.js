import { useState, useEffect } from "preact/hooks";
import styled from "styled-components";
import APIs from "../utillity/apis";
import { Worst, Bad, So, Good, Excellent } from "../utillity/Icons";
import { Checkbox } from "@material-ui/core";

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
`;

const Warning = styled(DetailTitle)`
  margin-left: 1.2rem;
  font-size: 1.6rem;
  color: #eb5757;
  display: ${(props) => (props.required ? "inline" : "none")};
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
  font-size: 1.6rem;
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
  color: ${(props) => (props.selected === true ? "#2F80ED" : "#BDBDBD")};
  font-size: 1.6rem;
  border: 0.2rem solid
    ${(props) => (props.selected === true ? "#2F80ED" : "#BDBDBD")};
  height: 3rem;
  width: 3rem;
  text-align: center;
  border-radius: 18%;
  text-align: center;
  cursor: pointer;

  &:active {
    color: #2f80ed;
    border: 0.2rem solid #2f80ed;
  }

  &:hover {
    color: #9ac1ee;
    border: 0.2rem solid #9ac1ee;
  }
`;

const GradeBar = styled.div`
  display: flex;
  width: 100%;
  max-width: 46rem;
  justify-content: space-between;
`;

const InputName = styled.input`
  border: 0.2rem solid #e0e0e0;
  border-radius: 1rem;
  height: 3.4rem;
  width: 20rem;
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem;
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
  font-size: 1.6rem;
  color: #bdbdbd;
  font-weight: 500;
  text-align: center;
  align-self: center;
`;

const Button = styled.button`
  font-family: "Kanit", arial, sans-serif;
  background-color: #bdbdbd;
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
  cursor: pointer;
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

  svg {
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
`;

const CheckboxContainer = styled.div`
  display: flex;
  font-size: 1.6rem;
  align-items: center;
  margin: 1rem 0;
  text-align: left;

  .MuiSvgIcon-root {
    width: 1.8em;
    height: 1.8em;
  }

  .MuiCheckbox-colorSecondary.Mui-checked {
    color: #2f80ed;
  }
`;

const ReviewForm = (props) => {
  const { enable, back, modal, classId } = props;
  const [showDialog, setDialog] = useState(false);
  const initialForm = {
    classId: classId,
    text: "",
    author: "",
    grade: -1,
  };
  const initialScore = {
    how: -1,
    homework: -1,
    interest: -1,
  };
  const initialRequire = {
    text: false,
    score: false,
    grade: false,
    author: false,
    rude: false,
    other: false,
  };
  const [form, setForm] = useState(initialForm);
  const [score, setScore] = useState(initialScore);
  const [require, setRequire] = useState(initialRequire);
  // modal(showDialog);

  const rate = (item, key) => {
    setScore({ ...score, [item.id]: key + 1 });
  };

  const required = () => {
    let req = { ...require };
    if (
      form.text !== "" &&
      form.author !== "" &&
      form.grade !== -1 &&
      score.homework !== -1 &&
      score.how !== -1 &&
      score.interest !== -1 &&
      require.rude &&
      require.other
    ) {
      setRequire(initialRequire);
      setDialog(true);
      modal(true);
    } else {
      if (form.text === "") req.text = true;
      else req.text = false;
      if (score.homework === -1 || score.how === -1 || score.interest === -1)
        req.score = true;
      else req.score = false;
      if (form.grade === -1) req.grade = true;
      else req.grade = false;
      if (form.author === "") req.author = true;
      else req.author = false;
      setRequire(req);
    }
  };

  const sendReview = () => {
    APIs.createReview(form, score, () => {
      setDialog(false);
      modal(false);
      setForm({ ...initialForm, classId: classId });
      setScore({ ...initialScore });
      back("details");
    });
  };

  useEffect(() => {
    setForm({ ...initialForm, classId: classId });
    setScore({ ...initialScore });
  }, [classId]);

  return (
    <Container isEnable={enable}>
      <FormTitle>
        <DetailTitle>
          รีวิววิชานี้
          <Warning required={require.text}>กรุณากรอกรีวิว</Warning>
        </DetailTitle>
        <Button onClick={() => back("details")}>ย้อนกลับ</Button>
      </FormTitle>
      <ReviewField
        type="textarea"
        placeholder="เขียนรีวิว..."
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />
      <DetailTitle>
        ให้คะแนนวิชา
        <Warning required={require.score}>กรุณาเลือกทุกหัวข้อ</Warning>
      </DetailTitle>
      {Rate.map((item, key) => (
        <ScoreBar key={key}>
          <ScoreTitle>{item.title}</ScoreTitle>
          <Rating>
            {RateIcon.map((Rate, key_rate) => (
              <RateContainer
                key={key_rate}
                onClick={() => rate(item, key_rate)}
                selected={score[item.id] - 1 === key_rate}
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
              onClick={() => setForm({ ...form, grade: item })}
              key={key}
              selected={form.grade === item}
            >
              {item}
            </GradeButton>
          ))}
        </GradeBar>
      </InputContainer>
      <InputContainer>
        <DetailTitle>
          นามปากกา
          <Warning required={require.author}>กรุณากรอกนามปากกา</Warning>
        </DetailTitle>
        <InputName
          placeholder="ใส่ชื่อผู้เขียน"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
      </InputContainer>
      <Caution>
        กรุณาตรวจสอบความถูกต้องก่อนรีวิว
        <CheckboxContainer>
          <Checkbox
            color="primary"
            checked={require.rude}
            onChange={(e) => setRequire({ ...require, rude: e.target.checked })}
          />
          เนื้อหาไม่มีคำหยาบคาย
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox
            color="primary"
            checked={require.other}
            onChange={(e) =>
              setRequire({ ...require, other: e.target.checked })
            }
          />
          เนื้อหาไม่มีการพาดพิงถึงผู้อื่น
        </CheckboxContainer>
      </Caution>
      <ReviewButton onClick={required}>รีวิวเลย !</ReviewButton>
      <ModalBackdrop
        show={showDialog}
        onClick={() => {
          setDialog(false);
          modal(false);
        }}
      />
      <Modal show={showDialog}>
        เมื่อกดรีวิวแล้ว จะไม่สามารถแก้ได้
        <div>ต้องการรีวิวเลยใช่หรือไม่ ?</div>
        <ModalActions>
          <CancelButton
            onClick={() => {
              setDialog(false);
              modal(false);
            }}
          >
            กลับไปแก้ไข
          </CancelButton>
          <ReviewButton onClick={sendReview}>รีวิวเลย !</ReviewButton>
        </ModalActions>
      </Modal>
    </Container>
  );
};

export default ReviewForm;
