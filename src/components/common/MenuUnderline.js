import styled, { css } from "styled-components";
import { DetailTitle } from "./FetcherComponents";

const TabTitle = styled(DetailTitle)`
	padding: 0 1rem;
	cursor: pointer;
	color: ${(props) => (props.isActive ? props.theme.mainText : "#BFBFBF")};
`;

const SectionTabButton = styled.div`
	position: relative;
`;

const TabLine = styled.div`
	width: 100%;
	height: 3px;
	border-radius: 50px;
	background-color: ${(props) => props.theme.borderColor};
	position: absolute;

	&:last-child {
		background-color: #2f80ed;
		transition: all 0.3s ease-in-out;
        ${props => props.currentRoute === "HOME" ? (
            props.underlineAt === "review"
				? css`
					width: 9rem;
					left: 0;
                `
				: props.underlineAt === "question" ? css`
					width: 11.2rem;
					left: 4.8rem;
                ` : css`
          width: 14.2rem;
					left: 11.8rem;
                `
            ) : (props.underlineAt === "review"
                ? css`
                    width: 10.4rem;
                    left: 0;
                `
                : props.underlineAt === "question" ? css`
                    width: 12.3rem;
                    left: 4.8rem;
                ` : css`
                    width: 15.6rem;
                    left: 11.8rem;
                `
            )
        }
	}
`;

const WrapperNewFeature = styled.div`
  display: flex;
`

const NewFeatureBadge =  styled.span`
  font-size: 1.2rem;
  line-height: 1.6rem;

  color: white;
  background-color: hsl(11, 85%, 47%);
  
  width: 4rem;
  height: 1.8rem;
  border-radius: 0.6rem;
  margin: 0.6rem 0.8rem 0 0 ;
  
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuUnderline = (props) => {
    const { fetchTarget, changeTab, currentRoute } = props

    return (
        <SectionTabButton>
            <TabTitle 
                as="button"
                isActive={fetchTarget === "review"}
                onClick={() => changeTab("review")}
            >
                {fetchTarget === "review" ? (currentRoute === "HOME" ? "รีวิวล่าสุด" : "รีวิวทั้งหมด") : "รีวิว"}
            </TabTitle>
            <TabTitle
                as="button"
                isActive={fetchTarget === "question"}
                onClick={() => changeTab("question")}
            >
                {fetchTarget === "question" ? (currentRoute === "HOME" ? "คำถามล่าสุด" : "คำถามทั้งหมด") : "คำถาม"}
            </TabTitle>
            <TabTitle
                as="button"
                isActive={fetchTarget === "recap"}
                onClick={() => changeTab("recap")}
            >
                <WrapperNewFeature>
                  <NewFeatureBadge>NEW</NewFeatureBadge>
                  {fetchTarget === "recap" ? (currentRoute === "HOME" ? "สรุปล่าสุด" : "สรุปทั้งหมด") : "สรุป"}
                </WrapperNewFeature>
            </TabTitle>
            <TabLine />
            <TabLine currentRoute={currentRoute} underlineAt={fetchTarget} />
        </SectionTabButton>
    )
}

export default MenuUnderline
