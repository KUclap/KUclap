import { useContext, useEffect, useState } from "preact/hooks";
import styled from "styled-components";

import { FetcherContext } from "../../context/FetcherContext";
import useDeleteRecap from "../../hooks/useDeleteRecap";
import useReportRecap from "../../hooks/useReportRecap";
import APIs from "../utility/apis";
import { getColorHash, navigateToClassPage, navigateToReviewPage, parseDate } from "../utility/helper";
import { Download, ThreeDots } from "../utility/Icons";
import { blue, grey_50 } from "./Colors";
import {
	BodySmall,
	Input,
	ModalActions,
	SecondaryButton,
	Subject,
	Warning,
	WhiteCircularProgress,
} from "./DesignSystemStyles";
import MenuPopup, { MenuItemCustom } from "./MenuPopup";
import Modal, { CancelButton, ConfirmButton, ReportField } from "./Modal";

const RecapCardContainer = styled.div`
	border: 0.2rem solid ${(props) => props.theme.borderColor};
	border-radius: 1rem;
	margin: 3rem 0;
	padding: 1rem 1.2rem;
	min-width: 27.6rem;
	overflow: hidden;
	display: flex;
	justify-content: space-between;

	> div {
		font-size: 1.2rem;
		color: ${grey_50};

		span {
			color: ${blue};
		}
	}

	${SecondaryButton} {
		padding: 0.2rem 0.9rem;

		svg {
			margin-left: 0.6rem;
		}
	}
`;

const CardHeader = styled.div`
	font-size: 1.8rem;
	color: ${(props) => props.theme.mainText};
	display: flex;
	justify-content: space-between;

	> button {
		display: flex;
		align-items: center;
	}
`;

const CardActions = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
`;

const CardDetails = styled.div`
	margin-top: ${(props) => (props.isBadge === true ? "0.8rem" : 0)};

	> div:not(:last-child) {
		margin-bottom: 0.4rem;
	}
`;

const RecapCard = (props) => {
	const { recapInfo, currentRoute, isBadge } = props;

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

	const { isLoading: isLoadingReport, sendReport } = useReportRecap(
		recapInfo.recapId,
		recapInfo.classId,
		reportReason.reason
	);

	const { isLoading: isLoadingDelete, deleteRecap, isAuthMatch } = useDeleteRecap(
		recapInfo.recapId,
		auth,
		currentRoute,
		recapInfo.classId
	);

	const handleReport = () => {
		if (reportReason.reason.length < 10) setReportReason({ ...reportReason, require: true });
		else sendReport(closeReportModal);
	};

	const handleDelete = () => {
		const authIsEmpty = auth.value === "";
		if (!authIsEmpty) {
			deleteRecap(closeDeleteModal, handleCardDeleted);
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

	const handleOpenRecapLink = () => {
		APIs.getPresignDownloadRecapByRecapID(recapInfo.recapId);
	};

	useEffect(() => {
		setAuth({ ...auth, isMatch: isAuthMatch });
	}, [isAuthMatch]);

	return (
		<>
			<RecapCardContainer>
				{isBadge && (
					<Subject
						color={getColorHash(recapInfo.classId)}
						onClick={() => navigateToClassPage(recapInfo.classId, "recap")}
					>
						{recapInfo.classId}
						<BodySmall as="span"> | {recapInfo.classNameTH}</BodySmall>
					</Subject>
				)}
				<CardDetails isBadge={isBadge}>
					<CardHeader>สรุปของ {recapInfo.author}</CardHeader>
					<div>
						จำนวนการดาวน์โหลด <span>{recapInfo.downloaded}</span> ครั้ง
					</div>
					<div>อัปโหลดเมื่อ {parseDate(recapInfo.createdAt)}</div>
				</CardDetails>
				<CardActions>
					<button onClick={(e) => setMenu(e.currentTarget)} aria-controls="more-menu" aria-haspopup="true">
						<ThreeDots />
					</button>
					<MenuPopup menu={menu} setMenu={setMenu}>
						<MenuItemCustom
							onClick={() => {
								setMenu(null);
								navigateToReviewPage(recapInfo.reviewId);
							}}
						>
							ดูรีวิวนี้
						</MenuItemCustom>
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
							ลบสรุป
						</MenuItemCustom>
					</MenuPopup>
					<SecondaryButton onClick={handleOpenRecapLink}>
						ดาวน์โหลด <Download />
					</SecondaryButton>
				</CardActions>
			</RecapCardContainer>
			<Modal showModal={showReportModal} closeModal={closeReportModal}>
				เหตุผลในการแจ้งลบ
				<Warning>{reportReason.require ? "กรุณากรอกเหตุผลอย่างน้อย 10 ตัวอักษร" : ""}</Warning>
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
				กรอกตัวเลข 4 หลักของคุณเพื่อลบสรุป
				<Warning>เมื่อลบสรุป รีวิวจะถูกลบด้วย</Warning>
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
						{isLoadingDelete ? <WhiteCircularProgress size="2rem" /> : "ลบสรุป"}
					</ConfirmButton>
				</ModalActions>
			</Modal>
		</>
	);
};

export default RecapCard;
