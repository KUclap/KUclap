import styled from "styled-components";
import { Clap } from '../../assets/icons/Icons'

const Container = styled.div`
    border: 0.2rem solid #E0E0E0;
    border-radius: 1rem;
    margin: 2rem 0;
    padding: 1.2rem 1.6rem;
`;

const Content = styled.div`
    font-size: 1.7rem;
    color: #4F4F4F;
`;

const DetailsContainer = styled.div`
    font-size: 1.6rem;
    display: flex;
    color: #828282;
    margin-top: 0.8rem;
    justify-content: space-between;
`

const DetailRight = styled.div`
    display: flex;
    width: 14rem;
    justify-content: space-between;
`

const Button = styled.div`
    display: flex;
    width: ${props => props.type === "report" ? 6 : 3.5}rem;
    text-align: right;
    justify-content: ${props => props.type === "report" ? 'flex-end' : 'space-between'};
    color: #CCCCCC;
`

const ButtonLeft = styled.div`
    display: flex;
    width: 9.2rem;
    justify-content: space-between;
`

const ReviewCard = () => {
  return (
    <Container>
        <Content> การบ้านน้อยมากกกบ 8 ชม. ได้ A เย้ </Content>
        <DetailsContainer>
            โดย ASMB
            <DetailRight>
                <span>เกรด A</span>
                <span>11 เม.ย. 19</span>
            </DetailRight>
        </DetailsContainer>
        <DetailsContainer>
            <ButtonLeft>
                <Button>
                    <Clap />
                    11
                </Button>
                <Button>
                    <Clap />
                    11
                </Button>
            </ButtonLeft>
            <Button type="report">Report</Button>
      </DetailsContainer>
    </Container>
  );
};

export default ReviewCard;
