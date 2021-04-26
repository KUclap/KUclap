import Header from "./Header";
import Helmet from "./Helmet";
import { h } from "preact";
import { route } from "preact-router";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import Select from "react-virtualized-select";
import styled, { css, withTheme } from "styled-components";

import { FetcherContext } from "../../context/FetcherContext";
import { SelectContext } from "../../context/SelectContext";
import baseroute from "../utility/baseroute";
import { GoToTop } from "../utility/Icons";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	max-width: 72rem;
	margin: 0 auto;
	position: relative;
`;

const SelectCustom = styled(Select)`
	width: 80%;
	max-width: 58rem;
	font-size: 1.4rem;
	user-select: none;
	margin-bottom: 2.2rem;

	.Select-placeholder {
		background: ${(props) => props.theme.body};
		color: #888;
		align-items: center;
		padding: 0 1.2rem;
	}

	&,
	&.is-open,
	&.is-focused,
	&.is-focused:not(.is-open) {
		.Select-control {
			background-color: ${(props) => props.theme.body};
		}
	}
	.Select-control {
		background-color: ${(props) => props.theme.body};
		width: 100%;
		margin: 0 auto;
		border: 0.2rem solid ${(props) => props.theme.borderColor};
		border-radius: 10px;

		.Select-multi-value-wrapper {
			height: 2.7rem;
		}
	}

	.Select-input {
		width: 100%;
		font-size: 16px;
	}

	.Select-input > input {
		color: ${(props) => props.theme.mainText};
	}

	.Select-menu-outer,
	.Select-option {
		background-color: ${(props) => props.theme.body};
	}

	.VirtualizedSelectOption {
		line-height: 130%;
	}
`;

const GoTopCustomStyle = styled.a`
	position: fixed;
	z-index: 99;
	right: 2.5rem;
	bottom: 2.5rem;
	cursor: pointer;
	transition: all 0.5s ease;
	user-select: none;
	/* -webkit-tap-highlight-color: transparent; */

	${(props) =>
		props.isBottomViewport
			? css`
					& {
						bottom: 2.5rem;
					}
			  `
			: css`
					& {
						bottom: -10rem;
					}
			  `}
`;

const PageTemplate = ({ classID, toggleTheme, children, isFormPage, classes, content, fetchTarget }) => {
	const { state: selected, dispatch: dispatchSelected } = useContext(SelectContext);

	const newEle = useRef(null);
	const [isBottomViewport, setIsBottomViewport] = useState(false);
	const { handleFetching } = useContext(FetcherContext);

	const handleSelected = (e) => {
		if (!isFormPage) {
			if (fetchTarget === "review") handleFetching?.ReviewsAndClass(e.classId);
			else if (fetchTarget === "question") handleFetching?.QuestionsAndClass(e.classId);
			else if (fetchTarget === "recap") handleFetching?.RecapsAndClass(e.classId);

			dispatchSelected({
				type: "selected",
				value: { label: e.label, classID: e.classId },
			});
		}

		if (fetchTarget && fetchTarget !== "review") {
			route(`${baseroute}/${e.classId}?display=${fetchTarget}`);
		} else {
			route(`${baseroute}/${e.classId}`);
		}
	};

	useEffect(() => {
		if (!classID && classes.length !== 0)
			dispatchSelected({
				type: "change_label",
				value: {
					label: "ค้นหาวิชาด้วยรหัสวิชา ชื่อวิชาภาษาไทย / ภาษาอังกฤษ",
				},
			});
	}, [classes]);

	useEffect(() => {
		if (typeof window !== "undefined")
			window.addEventListener(
				"scroll",
				() => {
					const checkBottomViewport = window.scrollY > window.innerHeight - 100 && !isBottomViewport;
					const checkTopViewport = window.scrollY <= window.innerHeight - 100 && isBottomViewport;

					if (checkBottomViewport) {
						setIsBottomViewport(true);
					} else if (checkTopViewport) {
						setIsBottomViewport(false);
					}
				},
				{ passive: true }
			);
	});

	return (
		<Container name="top">
			<Helmet content={content} />
			<GoTopCustomStyle aria-label="go-to-top" isBottomViewport={isBottomViewport} href="#top">
				<GoToTop />
			</GoTopCustomStyle>
			<Header toggleTheme={toggleTheme} />

			<SelectCustom
				name="major"
				autosize={false}
				options={classes}
				valueKey={"classId"}
				key={"classId"}
				placeholder={selected.label}
				onChange={handleSelected}
				ref={newEle}
				id="subject-input"
				aria-label="search"
				optionHeight={50}
			/>
			{children}
		</Container>
	);
};

export default withTheme(PageTemplate);
