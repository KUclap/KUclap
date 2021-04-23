import { useState } from "preact/hooks"
import styled from "styled-components"
import useReportAnswer from "../../hooks/useReportAnswer"
import { timeDifference } from "../utility/helper"
import { ThreeDots } from "../utility/Icons"
import { ModalActions, Warning, WhiteCircularProgress } from "./DesignSystemStyles"
import MenuPopup, { MenuItemCustom } from "./MenuPopup"
import Modal, { CancelButton, ConfirmButton, ReportField } from "./Modal"

const AnswerCardContainer = styled.div`
	background: ${props => props.theme.lightBlueBackground};
	font-size: 1.6rem;
    border-radius: 8px;
    padding: 0.6rem 1.1rem;
    display: flex;
    flex-direction: column;
`

const AnswerDetailsContainer = styled.div`
	font-size: 1.3rem;
    margin: 0.4rem 0;
    color: ${props => props.theme.subText};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

	span {
		font-size: 1.2rem;
	}

    > div {
        display: flex;
        align-items: center;
    }
`

const OptionsButton = styled.button`
    background: ${props => props.theme.lightBlueBackground};
    border-radius: 50rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const OuterContainer = styled.div`
    ${Warning} {
        margin-bottom: 0.5rem;
    }
`

const AnswerCard = (props) => {
    const { answerInfo, classId } = props
    const [menu, setMenu] = useState(null)
    const [showReportModal, setReportModal] = useState(false)

    const defaultReportReason = {
        reason: '',
        require: false,
    }
    const [reportReason, setReportReason] = useState(defaultReportReason)

    const { isLoading: isLoadingReport, sendReport } = useReportAnswer(
		answerInfo.answerId, 
		classId, 
		reportReason.reason
	)

    const closeReportModal = () => {
        setReportModal(false)
        setReportReason(defaultReportReason)
    }

    const handleOnChange = (e) => {
		let value = e.target.value
        if (/^\s/.test(value)) {
            value = ''
        }
        setReportReason({ ...reportReason, reason: value })
    }

    const handleReport = () => {
        if (reportReason.reason.length < 10) setReportReason({ ...reportReason, require: true })
        else sendReport(closeReportModal)
    }

    return (
        <OuterContainer>
            <AnswerCardContainer>
                <AnswerDetailsContainer>
                    คำตอบของ {answerInfo.author} 
                    <div>
                        <span>{timeDifference(answerInfo.createdAt)}</span>
                        <OptionsButton 
                            onClick={(e) => setMenu(e.currentTarget)}
                            aria-controls="more-menu"
                            aria-haspopup="true"
                        >
                            <ThreeDots />
                        </OptionsButton>
                        <MenuPopup menu={menu} setMenu={setMenu}>
                            <MenuItemCustom
                                onClick={() => {
                                    setMenu(null)
                                    setReportModal(true)
                                }}>
                                แจ้งลบ
                            </MenuItemCustom>
                        </MenuPopup>
                    </div>
                </AnswerDetailsContainer>
                {answerInfo.answer}
            </AnswerCardContainer>
            <Modal showModal={showReportModal} closeModal={closeReportModal}>
                เหตุผลในการแจ้งลบ
                <Warning>{reportReason.require ? 'กรุณากรอกเหตุผลอย่างน้อย 10 ตัวอักษร' : ''}</Warning>
                <ReportField
                    placeholder="อย่างน้อย 10 ตัวอักษร"
                    value={reportReason.reason}
                    onChange={(e) => handleOnChange(e)}
                />
                <ModalActions>
                    <CancelButton onClick={closeReportModal}>ยกเลิก</CancelButton>
                    <ConfirmButton onClick={handleReport}>
                        {isLoadingReport ? <WhiteCircularProgress size="2rem" /> : 'แจ้งลบ'}
                    </ConfirmButton>
                </ModalActions>
            </Modal>
        </OuterContainer>
    )
}

export default AnswerCard
