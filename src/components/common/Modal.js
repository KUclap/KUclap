import { h } from "preact";
import { useContext, useEffect } from "preact/hooks";
import styled, { css } from "styled-components";
import media from "styled-media-query";

import { ModalContext } from "../../context/ModalContext";
import { red, sea_pink } from "./Colors";
import { Backdrop, Input, PrimaryButton, SecondaryButton, TextArea } from "./DesignSystemStyles";

export const ConfirmButton = styled(PrimaryButton)`
	background-color: ${red};
	margin: 2rem 1.6rem 0;

	&:hover {
		background: ${sea_pink};
	}
`;

export const CancelButton = styled(SecondaryButton)`
	margin: 2rem 1.6rem 0;
	color: ${(props) => props.theme.subText};
	box-shadow: inset 0 0 0 0.1rem ${(props) => props.theme.subText};

	&:hover {
		background: ${(props) => props.theme.lightBackground};
	}
`;

export const ReportField = styled(TextArea)`
	height: 12rem;
	width: 100%;
	max-width: 30rem;
	margin-top: 1.6rem;
`;

const ModalContent = styled.div`
	border: ${(props) => (props.theme.name === "dark" ? `0.3rem solid ${props.theme.borderColor}` : 0)};
	border-radius: 10px;
	background-color: ${(props) => (!props.show ? "transparent" : props.theme.body)};
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 2.8rem 1.2rem;
	font-weight: 500;
	font-size: 2rem;
	line-height: 3.4rem;
	text-align: center;
	display: ${(props) => (props.show === true ? "block" : "none")};
	z-index: 1;
	max-width: 42rem;
	width: 84%;

	${Input} {
		width: 18rem;
		margin-top: 1.2rem;
		align-self: flex-start;
	}

	${(props) =>
		props.type === "ShareModal" &&
		css`
			& {
				padding: 0 1.2rem 2.8rem;
				font-size: 1.8rem;

				${media.lessThan("medium")`
        top: auto;
        bottom: 0;
        transform: translate(-50%, 0);
        width: 100%;
        max-width: 100%;
        border-radius: 22px 22px 0px 0px;
        padding: 0;
        height: fit-content;
    `}
			}
		`}
`;

const Modal = (props) => {
	const { showModal, closeModal, type, children } = props;
	const { dispatch: dispatchShowModal } = useContext(ModalContext);

	useEffect(() => {
		dispatchShowModal({ type: "setter", value: showModal });
		return () => {
			dispatchShowModal({ type: "setter", value: false });
		};
	}, [showModal]);

	return (
		<>
			<Backdrop show={showModal} onClick={closeModal} />
			<ModalContent show={showModal} type={type}>
				{children}
			</ModalContent>
		</>
	);
};

export default Modal;
