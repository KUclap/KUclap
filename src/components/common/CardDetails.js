import { h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import styled from "styled-components";

import { FetcherContext } from "../../context/FetcherContext";
import useDeleteReview from "../../hooks/useDeleteReview";
import useReportReview from "../../hooks/useReportReview";
import APIs from "../utility/apis";
import { navigateToReviewPage, parseDate } from "../utility/helper";
import { DownArrow, GradeCircle, Recap } from "../utility/Icons";
import { blue } from "./Colors";
import {
    BodyTiny,
    Input,
    ModalActions,
    PrimaryButton,
    SecondaryButton,
    Warning,
    WhiteCircularProgress,
} from './DesignSystemStyles'
import Modal, { CancelButton, ConfirmButton, ReportField } from './Modal'
import MenuPopup, { MenuContent, MenuContentContainer, MenuItemCustom } from './MenuPopup'

const DetailsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-self: flex-end;
	text-align: right;
	margin-left: 0.3rem;
	width: 100%;
`;

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
`;

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
`;

const MoreButton = styled(SecondaryButton)`
	border-radius: 15rem;
	border: 0.1rem solid ${(props) => props.theme.mainText};
	box-shadow: none;
	color: ${(props) => props.theme.mainText};
	padding: ${(props) => (props.fullButton ? "0 0.3rem 0 0.8rem" : 0)};
	font-weight: normal;
	font-size: inherit;

	svg {
		path {
			fill: ${(props) => props.theme.mainText};
		}
	}

	&:hover {
		background: ${(props) => props.theme.lightBackground};
	}
`;

const ButtonWithIcon = styled(PrimaryButton)`
	border-radius: 1.5rem;
	padding: 0 0.8rem;
	font-weight: 300;
	font-size: inherit;

	svg {
		margin-left: 0.3rem;

		path {
			fill: white;
		}
	}
`;

const CardDetails = (props) => {
	const { reviewId, classId, currentRoute, recapId, author, grade, semester, year, createdAt, sec } = props;

	const [showEditModal, setEditModal] = useState(false);
	const [showReportModal, setReportModal] = useState(false);
	const { handleCardDeleted } = useContext(FetcherContext);

	const [menu, setMenu] = useState(null);
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

	const { isLoading: isLoadingReport, sendReport } = useReportReview(reviewId, classId, reportReason.reason);

	const { isLoading: isLoadingDelete, deleteReview, isAuthMatch } = useDeleteReview(
		reviewId,
		auth,
		currentRoute,
		classId
	);

	const handleReport = () => {
		if (reportReason.reason.length < 10) setReportReason({ ...reportReason, require: true });
		else sendReport(closeReportModal);
	};

	const handleDelete = () => {
		if (auth.value === "") setAuth({ ...auth, require: true });
		else deleteReview(closeEditModal, handleCardDeleted);
	};

	useEffect(() => {
		setAuth({ ...auth, isMatch: isAuthMatch });
	}, [isAuthMatch]);

	const closeReportModal = () => {
		setReportModal(false);
		setReportReason(defaultReportReason);
	};

	const closeEditModal = () => {
		setEditModal(false);
		setAuth(defaultAuth);
	};

	const handleOnchangePassword = (e) => {
		const inputAuth = { ...auth };
		if (/^[0-9]*$/.test(e.target.value)) {
			inputAuth.value = e.target.value;
		}
		setAuth(inputAuth);
	};

	const handleOnchange = (e) => {
		let value = e.target.value;
		if (/^\s/.test(value)) {
			value = reportReason.value
		}
		setReportReason({ ...reportReason, reason: value });
	};

	const handleOpenRecapLink = () => {
		APIs.getPresignDownloadRecapByRecapID(recapId);
	};

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
				{recapId && (
					<ButtonWithIcon onClick={handleOpenRecapLink}>
						<BodyTiny>ชีทสรุป</BodyTiny>
						<Recap />
					</ButtonWithIcon>
				)}
				<MoreButton
					type="report"
					aria-controls="more-menu"
					aria-haspopup="true"
					onClick={(e) => setMenu(e.currentTarget)}
					fullButton={!recapId}
				>
					{!recapId && <BodyTiny>เพิ่มเติม</BodyTiny>}
					<DownArrow />
				</MoreButton>
				{
					menu &&
					<MenuPopup menu={menu} setMenu={setMenu}>
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
												1: "ต้น",
												2: "ปลาย",
												3: "ฤดูร้อน",
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
							{/* {recapId && <MenuContent><span>สรุปถูกดาวน์โหลด</span><span>0</span></MenuContent>} */}
							<MenuContent>
								<span>รีวิวเมื่อ</span>
								<span>{parseDate(createdAt)}</span>
							</MenuContent>
						</MenuContentContainer>
						<MenuItemCustom
							onClick={() => {
								setMenu(null);
								navigateToReviewPage(reviewId);
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
								setEditModal(true);
							}}
						>
							ลบรีวิว
						</MenuItemCustom>
					</MenuPopup>
				}
			</SubDetail>
			{
				showReportModal &&
				<Modal showModal={showReportModal} closeModal={closeReportModal}>
					เหตุผลในการแจ้งลบ
					<Warning>{reportReason.require ? "กรุณากรอกเหตุผลอย่างน้อย 10 ตัวอักษร" : ""}</Warning>
					<ReportField
						placeholder="อย่างน้อย 10 ตัวอักษร"
						value={reportReason.reason}
						onChange={(e) => handleOnchange(e)}
					/>
					<ModalActions>
						<CancelButton onClick={closeReportModal}>ยกเลิก</CancelButton>
						<ConfirmButton onClick={handleReport}>
							{isLoadingReport ? <WhiteCircularProgress size="2rem" /> : "แจ้งลบ"}
						</ConfirmButton>
					</ModalActions>
				</Modal>
			}
			{
				showEditModal &&
				<Modal showModal={showEditModal} closeModal={closeEditModal}>
					กรอกตัวเลข 4 หลักของคุณเพื่อลบรีวิว
					<Warning>{!auth.isMatch ? "ตัวเลขไม่ถูกต้อง" : "" || auth.require ? "กรุณากรอกตัวเลข" : ""}</Warning>
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
							{isLoadingDelete ? <WhiteCircularProgress size="2rem" /> : "ลบรีวิว"}
						</ConfirmButton>
					</ModalActions>
				</Modal>
			}
		</DetailsContainer>
	);
};

export default CardDetails;
