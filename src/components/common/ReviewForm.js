import { useState } from "preact/hooks";
import styled from "styled-components";
import { Worst, Bad, So, Good, Excellent } from "../../assets/icons/Icons";

const Grade = ["A", "B+", "B", "C+", "C", "D+", "D", "F"];
const Rate = [
  {
    id: "work",
    title: "จำนวนงานและการบ้าน",
  },
  {
    id: "lesson",
    title: "ความน่าสนใจของเนื้อหา",
  },
  {
    id: "teaching",
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
  margin: 1.2rem 2.8rem 1.2rem 0;
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

const Caution = styled.p`
  font-size: 2rem;
  color: #bdbdbd;
  font-weight: 500;
  text-align: center;
`;

const Button = styled.div`
  background-color: #bdbdbd;
  color: #fff;
  padding: 0.2rem 1.8rem;
  border-radius: 0.6rem;
  font-size: 1.4rem;
  font-weight: 500;
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
  position: absolute;
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

const ReviewForm = ({ enable, back, modal }) => {
  const [showDialog, setDialog] = useState(false);
  const [form, setForm] = useState({
    review: "เขียนรีวิว...",
    score: {
      work: -1,
      lesson: -1,
      teaching: -1,
    },
    grade: -1,
    author: "ใส่ชื่อผู้เขียน",
  });
  modal(showDialog);
  //console.log(form)

  return (
    <Container isEnable={enable}>
      <FormTitle>
        <DetailTitle>รีวิววิชานี้</DetailTitle>
        <Button onClick={() => back("details")}>ย้อนกลับ</Button>
      </FormTitle>
      <ReviewField
        type="textarea"
        placeholder={form.review}
        onChange={(e) => setForm({ ...form, review: e.target.value })}
      />
      <DetailTitle>ให้คะแนนวิชา</DetailTitle>
      {Rate.map((item, key) => (
        <ScoreBar key={key}>
          <ScoreTitle>{item.title}</ScoreTitle>
          <Rating>
            {RateIcon.map((Rate, key_rate) => (
              <RateContainer
                onClick={() => {
                  setForm({
                    ...form,
                    score: {
                      ...form.score,
                      [item.id]: key_rate,
                    },
                  });
                }}
                selected={form.score[item.id] === key_rate}
              >
                <Rate />
              </RateContainer>
            ))}
          </Rating>
        </ScoreBar>
      ))}
      <InputContainer>
        <DetailTitle>เกรดที่ได้</DetailTitle>
        <GradeBar>
          {Grade.map((item, key) => (
            <GradeButton
              onClick={() => setForm({ ...form, grade: item })}
              key={key + 1}
              selected={form.grade === item}
            >
              {item}
            </GradeButton>
          ))}
        </GradeBar>
      </InputContainer>
      <InputContainer>
        <DetailTitle>นามปากกา</DetailTitle>
        <InputName
          placeholder={form.author}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
        />
      </InputContainer>
      <Caution>กรุณาตรวจสอบความถูกต้องก่อนรีวิว</Caution>
      <ReviewButton onClick={() => setDialog(true)}>รีวิวเลย !</ReviewButton>
      <ModalBackdrop show={showDialog} onClick={() => setDialog(false)} />
      <Modal show={showDialog}>
        เมื่อกดรีวิวแล้ว จะไม่สามารถแก้ได้
        <div>ต้องการรีวิวเลยใช่หรือไม่ ?</div>
        <ModalActions>
          <CancelButton onClick={() => setDialog(false)}>
            กลับไปแก้ไข
          </CancelButton>
          <ReviewButton>รีวิวเลย !</ReviewButton>
        </ModalActions>
      </Modal>
    </Container>
  );
};

export default ReviewForm;
