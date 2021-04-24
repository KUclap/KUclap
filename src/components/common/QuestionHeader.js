import { useContext, useEffect, useState } from "preact/hooks";
import styled from "styled-components";
import { FetcherContext } from "../../context/FetcherContext";
import useDeleteQuestion from "../../hooks/useDeleteQuestion";
import useReportQuestion from "../../hooks/useReportQuestion";
import { timeDifference } from "../utility/helper";
import { ThreeDots } from "../utility/Icons";
import { Input, ModalActions, Warning, WhiteCircularProgress } from "./DesignSystemStyles";
import MenuPopup, { MenuItemCustom } from "./MenuPopup";
import Modal, { CancelButton, ConfirmButton, ReportField } from "./Modal";

const QuestionAuthor = styled.div`
	font-size: 1.3rem;
	font-weight: 500;
	color: ${(props) => props.theme.mainText};
`;

const CreatedAt = styled.div`
	font-size: 1.2rem;
	font-weight: 300;
	color: hsl(0, 0%, 51%);
`;

const QuestionHeaderContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	position: relative;
	margin-top: ${(props) => (props.isBadge === true ? "0.8rem" : 0)};

	span {
		height: fit-content;
	}

	svg {
		height: 1.8rem;
		width: 1.8rem;
	}
`;

const WarningCustom = styled(Warning)`
	margin-bottom: 0.5rem;
`;

const QuestionHeader = (props) => {
	const { questionInfo, currentRoute, isBadge } = props;

	const [menu, setMenu] = useState(null);
	const [showReportModal, setReportModal] = useState(false);
	const [showDeleteModal, setDeleteModal] = useState(false);

	const defaultAuth = {
		value: "",
		isMatch: true,
		require: false,
	};
	const defaultReportReason = {
		reason: "",
		require: false,
	};
	const [auth, setAuth] = useState(defaultAuth);
	const [reportReason, setReportReason] = useState(defaultReportReason);
	const { handleCardDeleted } = useContext(FetcherContext);

	const { isLoading: isLoadingReport, sendReport } = useReportQuestion(
		questionInfo.questionId,
		questionInfo.classId,
		reportReason.reason
	);

	const { isLoading: isLoadingDelete, deleteQuestion, isAuthMatch } = useDeleteQuestion(
		questionInfo.questionId,
		auth,
		currentRoute,
		questionInfo.classId
	);

	const handleReport = () => {
		if (reportReason.reason.length < 10) setReportReason({ ...reportReason, require: true });
		else sendReport(closeReportModal);
	};

	const handleDelete = () => {
		const authIsEmpty = auth.value === "";
		if (!authIsEmpty) {
			deleteQuestion(closeDeleteModal, handleCardDeleted);
		} else {
			setAuth({ ...auth, require: authIsEmpty });
		}
	};

	const closeReportModal = () => {
		setReportModal(false);
		setReportReason(defaultReportReason);
	};

	const closeDeleteModal = () => {
		setDeleteModal(false);
		setAuth(defaultAuth);
	};

	const handleOnChangePassword = (e) => {
		let newAuth = auth.value;
		if (/^[0-9]*$/.test(e.target.value)) {
			newAuth = e.target.value;
		}
		setAuth({ ...auth, value: newAuth });
	};

	const handleOnChange = (e) => {
		let value = e.target.value;
		if (/^\s/.test(value)) {
			value = reportReason.value;
		}
		setReportReason({ ...reportReason, reason: value });
	};

	useEffect(() => {
		setAuth({ ...auth, isMatch: isAuthMatch });
	}, [isAuthMatch]);

	return (
		<>
			<QuestionHeaderContainer isBadge={isBadge}>
				<div>
					<QuestionAuthor>คำถามจาก {questionInfo.author}</QuestionAuthor>
					<CreatedAt>{timeDifference(questionInfo.createdAt)}</CreatedAt>
				</div>
				<span>
					<button onClick={(e) => setMenu(e.currentTarget)} aria-controls="more-menu" aria-haspopup="true">
						<ThreeDots />
					</button>
					{menu && (
						<MenuPopup menu={menu} setMenu={setMenu}>
							<MenuItemCustom
								onClick={() => {
									setMenu(null);
									setReportModal(true);
								}}
							>
								แจ้งลบ
							</MenuItemCustom>
							<MenuItemCustom
								onClick={() => {
									setMenu(null);
									setDeleteModal(true);
								}}
							>
								ลบคำถาม
							</MenuItemCustom>
						</MenuPopup>
					)}
				</span>
			</QuestionHeaderContainer>
			<Modal showModal={showReportModal} closeModal={closeReportModal}>
				เหตุผลในการแจ้งลบ
				<WarningCustom>{reportReason.require ? "กรุณากรอกเหตุผลอย่างน้อย 10 ตัวอักษร" : ""}</WarningCustom>
				<ReportField
					placeholder="อย่างน้อย 10 ตัวอักษร"
					value={reportReason.reason}
					onChange={(e) => handleOnChange(e)}
				/>
				<ModalActions>
					<CancelButton onClick={closeReportModal}>ยกเลิก</CancelButton>
					<ConfirmButton onClick={handleReport}>
						{isLoadingReport ? <WhiteCircularProgress size="2rem" /> : "แจ้งลบ"}
					</ConfirmButton>
				</ModalActions>
			</Modal>
			<Modal showModal={showDeleteModal} closeModal={closeDeleteModal}>
				กรอกตัวเลข 4 หลักของคุณเพื่อลบคำถาม
				<Warning>{!auth.isMatch ? "ตัวเลขไม่ถูกต้อง" : "" || auth.require ? "กรุณากรอกตัวเลข" : ""}</Warning>
				<Input
					type="text"
					placeholder="ใส่ตัวเลข 4 หลัก"
					value={auth.value}
					onInput={handleOnChangePassword}
					maxLength={4}
				/>
				<ModalActions>
					<CancelButton onClick={closeDeleteModal}>ยกเลิก</CancelButton>
					<ConfirmButton onClick={handleDelete}>
						{isLoadingDelete ? <WhiteCircularProgress size="2rem" /> : "ลบคำถาม"}
					</ConfirmButton>
				</ModalActions>
			</Modal>
		</>
	);
};

export default QuestionHeader;
