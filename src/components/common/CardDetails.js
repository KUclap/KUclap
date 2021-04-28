import { h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import styled from "styled-components";

import { FetcherContext } from "../../context/FetcherContext";
import useDeleteReview from "../../hooks/useDeleteReview";
import useReportReview from "../../hooks/useReportReview";
import APIs from "../utility/apis";
import { navigateToReviewPage, parseDate } from "../utility/helper";
import { DownArrow, Facebook, GradeCircle, Recap, Twitter, WarningIcon } from "../utility/Icons";
import { blue, grey_20, red } from "./Colors";
import {
	BodyTiny,
	Input,
	ModalActions,
	PrimaryButton,
	SecondaryButton,
	Warning,
	WhiteCircularProgress,
} from "./DesignSystemStyles";
import MenuPopup, { MenuContent, MenuContentContainer, MenuItemCustom } from "./MenuPopup";
import Modal, { CancelButton, ConfirmButton, ReportField } from "./Modal";

import Menu from "@material-ui/core/Menu";

const DetailsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-self: flex-end;
	text-align: right;
	margin-left: 0.3rem;
	width: 100%;
	position: relative;
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

const ReportedWarning = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;

	> svg {
		width: 1.8rem;
		height: 1.8rem;

		path {
			fill: ${red};
		}
	}
`

const SocialIcon = styled.a`
	cursor: pointer;
	user-select: none;
	margin-left: 0.4rem;

	> svg {
		height: 1.8rem;
		width: 1.8rem;
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

const MenuCustom = styled(Menu)`
	.MuiPaper-elevation0 {
		background: hsl(0, 79%, 95%);
		margin-top: 0.4rem;
		color: ${grey_20};
		width: 80%;
		max-width: 36rem;
	}

	.MuiList-root {
		display: flex;
		flex-direction: column;
		font-weight: 500;
		font-size: 1.2rem;
		
		> div {
			margin-top: 0.2rem;
			font-size: 1.1rem;
			font-weight: 400;
			display: inline;
			align-self: flex-end;
		}
	}

	.MuiList-padding {
		padding: 0.8rem;
	}
`;

const CardDetails = (props) => {
	const { reviewId, classId, currentRoute, recapId, author, grade, semester, year, createdAt, sec, reported, deleteReason } = props;

	const [showEditModal, setEditModal] = useState(false);
	const [showReportModal, setReportModal] = useState(false);
	const [reportedText, setReportedText] = useState(null);
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
		// console.log("close");
		showReportModal;
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
			value = reportReason.value;
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
				{
					!deleteReason &&
					<Grade>
						<span>{grade}</span>
						<GradeCircle />
					</Grade>
				}
			</SubDetail>
			{
				!deleteReason &&
				<SubDetail>
					{reported && (<>
						<ReportedWarning 
							aria-controls="reported-text"
							aria-haspopup="true"
							onClick={(e) => setReportedText(e.currentTarget)} 
						>
							<WarningIcon />
						</ReportedWarning>
						{reportedText && (
							<MenuCustom
								elevation={0}
								getContentAnchorEl={null}
								transformOrigin={{
									vertical: "top",
									horizontal: "center",
								}}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								id="reported-text"
								anchorEl={reportedText}
								open={Boolean(reportedText)}
								onClose={() => setReportedText(null)}
								keepMounted
							>
								รีวิวนี้ถูกแจ้งลบเพราะข้อมูลบางอย่างไม่ถูกต้อง 
								โปรดศึกษารีวิวอื่น ๆ ประกอบการพิจารณา 
								รีวิวจะถูกลบเมื่อผู้ดูแลเห็นสมควร 
								<div>
									หากต้องการข้อมูลเพิ่มเติมติดต่อ KUclap ที่
									<span>
										<SocialIcon href="https://fb.com/kuclap/" target="_blank" rel="noopener noreferrer">
											<Facebook />
										</SocialIcon>
										<SocialIcon href="https://twitter.com/KUclapOfficial" target="_blank" rel="noopener noreferrer">
											<Twitter />
										</SocialIcon>
									</span>
								</div>
							</MenuCustom>
						)}
					</>)}
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
					{menu && (
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
					)}
				</SubDetail>
			}
			{showReportModal && (
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
			)}
			{showEditModal && (
				<Modal showModal={showEditModal} closeModal={closeEditModal}>
					กรอกตัวเลข 4 หลักของคุณเพื่อลบรีวิว
					<Warning>
						{!auth.isMatch ? "ตัวเลขไม่ถูกต้อง" : "" || auth.require ? "กรุณากรอกตัวเลข" : ""}
					</Warning>
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
			)}
		</DetailsContainer>
	);
};

export default CardDetails;
