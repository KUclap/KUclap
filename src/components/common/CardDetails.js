import { h } from 'preact'
import { useState, useEffect, useContext } from 'preact/hooks'
import CircularProgress from '@material-ui/core/CircularProgress'
import { navigateToReviewPage } from '../utility/helper'
import { Recap, DownArrow, GradeCircle } from '../utility/Icons'
import styled from 'styled-components'
import { ReviewFetcherContext } from '../../context/ReviewFetcherContext'
import { BodyTiny, Input, ModalActions, PrimaryButton, SecondaryButton, TextArea } from './DesignSystemStyles'
import Modal from './Modal'
import useReportReview from '../../hooks/useReportReview'
import useDeleteReview from '../../hooks/useDeleteReview'
import { blue, red } from './Colors'

const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']

const DetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-self: flex-end;
    text-align: right;
    margin-left: 0.3rem;
    width: 100%;
`

const SubDetail = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 0.5rem;
    justify-content: flex-end;
    position: relative;
    user-select: none;

    button {
        margin-left: 0.3rem;
    }
`

const Grade = styled.div`
    margin-left: 0.3rem;
    display: flex;
    font-size: 1.2rem;
    position: relative;

    span {
        color: ${blue};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    svg {
        display: flex;
    }
`

const MoreButton = styled(SecondaryButton)`
    border-radius: 15rem;
    border: 0.1rem solid ${(props) => props.theme.mainText};
    box-shadow: none;
    color: ${(props) => props.theme.mainText};
    padding: ${(props) => (props.fullButton ? '0 0.3rem 0 0.8rem' : 0)};
    font-weight: normal;
    font-size: inherit;

    &:hover {
        background: ${(props) => props.theme.lightBackground};
    }
`

const Menu = styled.div`
    display: ${(props) => (props.openMenu ? 'flex' : 'none')};
    background: ${(props) => props.theme.body};
    position: absolute;
    flex-direction: column;
    text-align: center;
    border-radius: 0.4rem;
    border: 0.1rem solid ${(props) => props.theme.mainText};
    right: 0;
    top: 0;
    margin-top: 2.8rem;
    z-index: 1;
    color: ${(props) => props.theme.mainText};
    box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.1);
`

const MenuContentContainer = styled.div`
    width: 12.7rem;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    margin: 0 0.7rem;
    padding: 1rem 0;
    border-bottom: 0.1rem solid ${(props) => props.theme.subText};
    cursor: default;
`

const MenuContent = styled.div`
    display: flex;
    justify-content: space-between;
    user-select: none;

    &:not(:first-child) {
        margin-top: 0.2rem;
    }

    span:last-child {
        color: ${blue};
    }
`

const MenuItem = styled.div`
    padding: 1rem;
    font-size: 1.2rem;
    user-select: none;
    cursor: pointer;
    color: ${(props) => props.theme.mainText};

    &:hover {
        background: ${(props) => props.theme.menuItem.hover};
        color: ${(props) => props.theme.mainText};
    }

    &:active {
        background: ${(props) => props.theme.menuItem.active};
        color: ${(props) => props.theme.mainText};
    }
`

const ButtonWithIcon = styled(SecondaryButton)`
    border: 0.1rem solid ${(props) => props.theme.mainText};
    box-shadow: none;
    border-radius: 1.5rem;
    padding: 0 0.8rem;
    color: ${(props) => props.theme.mainText};
    font-weight: normal;
    font-size: inherit;

    svg {
        margin-left: 0.3rem;

        path {
            fill: ${(props) => props.theme.mainText};
        }
    }

    &:hover {
        background: ${(props) => props.theme.lightBackground};
    }
`

const ConfirmButton = styled(PrimaryButton)`
    background-color: ${red};
    margin: 2rem 1.6rem 0;
`

const CancelButton = styled(SecondaryButton)`
    margin: 2rem 1.6rem 0;
    color: ${(props) => props.theme.subText};
    box-shadow: inset 0 0 0 0.1rem ${(props) => props.theme.subText};
`

const ReportField = styled(TextArea)`
    height: 12rem;
    width: 100%;
    max-width: 30rem;
    margin-top: 1.6rem;
`

const Warning = styled.div`
    color: ${red};
`

const CircularProgressCustom = styled(CircularProgress)`
    && {
        color: white;
    }
`

const CardDetails = (props) => {
    const { reviewId, classId, currentRoute, recap, author, grade, semester, year, createdAt, sec } = props

    const [showEditModal, setEditModal] = useState(false)
    const [showReportModal, setReportModal] = useState(false)
    const { handleCardDeleted } = useContext(ReviewFetcherContext)

    const [menu, setMenu] = useState(false)
    const defaultAuth = {
        value: '',
        isMatch: true,
        require: false,
    }
    const defaultReportReason = {
        reason: '',
        require: false,
    }
    const [auth, setAuth] = useState(defaultAuth)
    const [reportReason, setReportReason] = useState(defaultReportReason)
    
    const {
        isLoading: isLoadingReport,
        sendReport,
    } = useReportReview(reviewId, classId, reportReason.reason)

    const {
        isLoading: isLoadingDelete,
        deleteReview,
        isAuthMatch
    } = useDeleteReview(reviewId, auth, currentRoute, classId)

    const parseDate = (dateUTC) => {
        if (dateUTC) {
            let date = dateUTC.split('-')
            let day = date[2].slice(0, 2)
            let month = months[parseInt(date[1]) - 1]
            let year = date[0]
            if (day[0] === '0') day = day[1]
            return `${day} ${month} ${year}`
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const moreButton = document.getElementById(`more-button-${reviewId}`)
            document.addEventListener('click', (event) => handleOnBlurMoreBtn(moreButton, event))
        }
    })

    const handleOnBlurMoreBtn = (btn, event) => {
        let isClickInside = btn.contains(event.target)
        if (!isClickInside) {
            setMenu(false)
        }
    }

    const handleReport = () => {
        if (reportReason.reason.length < 10) setReportReason({ ...reportReason, require: true })
        else sendReport(closeReportModal)
    }

    const handleDelete = () => {
        if (auth.value === '') setAuth({ ...auth, require: true })
        else deleteReview(closeEditModal, handleCardDeleted)
    }

    useEffect(() => {
        setAuth({...auth, isMatch: isAuthMatch})
    }, [isAuthMatch])

    const closeReportModal = () => {
        setReportModal(false)
        setReportReason(defaultReportReason)
    }

    const closeEditModal = () => {
        setEditModal(false)
        setAuth(defaultAuth)
    }

    const handleOnchangePassword = (e) => {
        const inputAuth = { ...auth }
        if (/^[0-9]*$/.test(e.target.value)) {
            inputAuth.value = e.target.value
        }
        setAuth(inputAuth)
    }

    const handleOnchange = (e) => {
        let value = e.target.value
        if (/^\s/.test(value)) {
            value = ''
        }
        setReportReason({ ...reportReason, reason: value })
    }

    const handleOpenRecapLink = () => {
        window.open(recap)
    }

    return (
        <DetailsContainer>
            <SubDetail>
                <BodyTiny>โดย {author}</BodyTiny>
                <Grade>
                    <span>{grade}</span>
                    <GradeCircle />
                </Grade>
            </SubDetail>
            <SubDetail>
                {recap && (
                    <ButtonWithIcon onClick={handleOpenRecapLink}>
                        <BodyTiny>ชีทสรุป</BodyTiny>
                        <Recap />
                    </ButtonWithIcon>
                )}
                <MoreButton
                    type="report"
                    tabIndex="0"
                    id={`more-button-${reviewId}`}
                    onClick={() => setMenu(true)}
                    fullButton={!recap}>
                    {!recap && <BodyTiny>เพิ่มเติม</BodyTiny>}
                    <DownArrow />
                    <Menu openMenu={menu}>
                        <MenuContentContainer>
                            {sec !== 0 && (
                                <MenuContent>
                                    <span>หมู่เรียน (เซค)</span>
                                    <span>{sec}</span>
                                </MenuContent>
                            )}
                            {semester !== 0 && (
                                <MenuContent>
                                    <span>ภาคเรียน</span>
                                    <span>
                                        {
                                            {
                                                1: 'ต้น',
                                                2: 'ปลาย',
                                                3: 'ฤดูร้อน',
                                            }[semester]
                                        }
                                    </span>
                                </MenuContent>
                            )}
                            {year !== 0 && (
                                <MenuContent>
                                    <span>ปีการศึกษา</span>
                                    <span>{year}</span>
                                </MenuContent>
                            )}
                            {/* {recap && <MenuContent><span>สรุปถูกดาวน์โหลด</span><span>0</span></MenuContent>} */}
                            <MenuContent>
                                <span>รีวิวเมื่อ</span>
                                <span>{parseDate(createdAt)}</span>
                            </MenuContent>
                        </MenuContentContainer>
                        <MenuItem onClick={() => navigateToReviewPage(reviewId)}>ดูรีวิวนี้</MenuItem>
                        <MenuItem onClick={() => setReportModal(true)}>แจ้งลบ</MenuItem>
                        <MenuItem onClick={() => setEditModal(true)}>ลบรีวิว</MenuItem>
                    </Menu>
                </MoreButton>
            </SubDetail>
            <Modal showModal={showReportModal} closeModal={closeReportModal}>
                เหตุผลในการแจ้งลบ
                <Warning>{reportReason.require ? 'กรุณากรอกเหตุผลอย่างน้อย 10 ตัวอักษร' : ''}</Warning>
                <ReportField
                    placeholder="อย่างน้อย 10 ตัวอักษร"
                    value={reportReason.reason}
                    onChange={(e) => handleOnchange(e)}
                />
                <ModalActions>
                    <CancelButton onClick={closeReportModal}>ยกเลิก</CancelButton>
                    <ConfirmButton onClick={handleReport}>
                        {isLoadingReport ? <CircularProgressCustom size="3rem" /> : 'แจ้งลบ'}
                    </ConfirmButton>
                </ModalActions>
            </Modal>
            <Modal showModal={showEditModal} closeModal={closeEditModal}>
                กรอกตัวเลข 4 หลักของคุณเพื่อลบรีวิว
                <Warning>{!auth.isMatch ? 'ตัวเลขไม่ถูกต้อง' : '' || auth.require ? 'กรุณากรอกตัวเลข' : ''}</Warning>
                <Input
                    type="text"
                    placeholder="ใส่ตัวเลข 4 หลัก"
                    value={auth.value}
                    onInput={handleOnchangePassword}
                    maxLength={4}
                />
                <ModalActions>
                    <CancelButton onClick={closeEditModal}>ยกเลิก</CancelButton>
                    <ConfirmButton onClick={handleDelete}>
                        {isLoadingDelete ? <CircularProgressCustom size="3rem" /> : 'ลบรีวิว'}
                    </ConfirmButton>
                </ModalActions>
            </Modal>
        </DetailsContainer>
    )
}

export default CardDetails
