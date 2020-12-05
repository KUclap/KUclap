import { h } from "preact";
import { useState } from "preact/hooks";
import styled from "styled-components";
import Modal from './Modal'
import { ModalHeader } from "./DesignSystemStyles"
import { Share, Facebook, Twitter, Line, CopyLink } from "../utility/Icons";

const ShareSelect = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  padding: 1rem 3rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.lightColor};
  cursor: pointer;
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
	} = props
  const [isCopied, setIsCopied] = useState(false);

	const shareReview = (type) => {
    const href = `https://kuclap.com/review/${reviewId}`;
    let url;
    switch (type) {
      case "facebook": {
        const appId = "784451072347559";
        url = `https://fb.com/dialog/share?app_id=${appId}&href=${href}&display=page`;
        window.open(url);
        break;
      }
      case "twitter": {
        const tweetText = `รีวิววิชา ${classNameTH} (${classId}) #KUclap ${href}`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          tweetText
        )}`;
        window.open(url);
        break;
      }
      case "line": {
        const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
          href
        )}`;
        window.open(url);
        break;
      }
      default: {
        const tmpTextArea = document.createElement("textarea");
        tmpTextArea.value = href;
        document.body.appendChild(tmpTextArea);
        tmpTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tmpTextArea);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }
    }
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
			<ShareSelect onClick={() => shareReview("facebook")}>
				<Facebook />
				Facebook
			</ShareSelect>
			<ShareSelect onClick={() => shareReview("twitter")}>
				<Twitter />
				Twitter
			</ShareSelect>
			<ShareSelect onClick={() => shareReview("line")}>
				<Line />
				LINE
			</ShareSelect>
			<ShareSelect isCopied={isCopied} onClick={shareReview}>
				<CopyLink />
				{isCopied ? "คัดลอกเรียบร้อย!" : "คัดลอกลิงก์"}
			</ShareSelect>
		</Modal>
	)
}

export default ShareModal
