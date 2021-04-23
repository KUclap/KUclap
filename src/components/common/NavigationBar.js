import styled from "styled-components"
import media from "styled-media-query"
import { navigateToFormReviewPage, navigateToHomePage } from "../utility/helper"
import { Pencil, Question } from "../utility/Icons"
import { PrimaryButton } from "./DesignSystemStyles"

const NavBarContainer = styled.div`
    position: fixed;
    bottom: 0;
    background: ${props => props.theme.body};
    box-shadow: 0px -1px 10px ${props => props.theme.borderColor};
    width: 100%;
    padding: 1.2rem 1.5rem;
    display: flex;
    justify-content: space-between;

    ${media.greaterThan('411px')`
		display: none;
	`}

    > button:first-child {
        font-size: 1.6rem;
        padding: 0.3rem 1.1rem;
        color: ${props => props.theme.subText};
    }

    ${PrimaryButton} {
        padding: 0.3rem 1rem;

        svg {
            margin-left: 0.8rem;
        }
    }
`

const NavigationBar = (props) => {
    const { tab, classID, askQuestion } = props
    
    return (
        <NavBarContainer>
            <button onClick={navigateToHomePage}>
                หน้าแรก
            </button>
            {(tab === "review" || tab === "recap") ? 
                <PrimaryButton onClick={() => navigateToFormReviewPage(classID)}>
                    รีวิววิชานี้ <Pencil />
                </PrimaryButton>
                : <PrimaryButton onClick={askQuestion}>
                    ถามคำถาม <Question />
                </PrimaryButton>
            }
        </NavBarContainer>
    )
}

export default NavigationBar
