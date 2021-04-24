import { h } from "preact";
import { useState } from "preact/hooks";
import styled from "styled-components";
import Modal from './Modal'
import { ModalHeader } from "./DesignSystemStyles"
import { Share, Facebook, Twitter, Line, CopyLink } from "../utility/Icons";
import { shareReview } from "../utility/share";

const ShareSelect = styled.button`
  width: 100%;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  padding: 1rem 3rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};
  user-select: none;
  color: ${(props) =>
    props.isCopied ? "hsl(145, 63%, 42%)" : props.theme.mainText};

  svg {
    margin-right: 1.6rem;
    height: 2.4rem;
    width: 2.4rem;

    path {
      fill: ${(props) =>
        props.isCopied ? "hsl(145, 63%, 42%)" : props.theme.mainText};
    }
  }

  &:hover {
    background-color: ${(props) => props.theme.menuItem.hover};
  }

  &:active {
    background-color: ${(props) => props.theme.menuItem.active};
  }
`

const ShareModal = (props) => {
	const {
		showShareModal,
		closeShareModal,
    reviewId,
    classId,
    classNameTH
	} = props
  const [isCopied, setIsCopied] = useState(false);

	const handleShareReview = (type) => {
    shareReview(type, reviewId, classId, classNameTH, setIsCopied)
    setTimeout(closeShareModal, 450)
  };

	return (
		<Modal
        showModal={showShareModal}
        closeModal={closeShareModal}
        type="ShareModal"
      >
			<ModalHeader>
				แบ่งปันรีวิว
				<Share />
			</ModalHeader>
			<ShareSelect onClick={() => handleShareReview("facebook")}>
				<Facebook />
				Facebook
			</ShareSelect>
			<ShareSelect onClick={() => handleShareReview("twitter")}>
				<Twitter />
				Twitter
			</ShareSelect>
			<ShareSelect onClick={() => handleShareReview("line")}>
				<Line />
				LINE
			</ShareSelect>
			<ShareSelect isCopied={isCopied} onClick={handleShareReview}>
				<CopyLink />
				{isCopied ? "คัดลอกเรียบร้อย!" : "คัดลอกลิงก์"}
			</ShareSelect>
		</Modal>
	)
}

export default ShareModal
