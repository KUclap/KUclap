import { h } from "preact";
import { useRef } from "preact/hooks";
import styled from "styled-components";

import { BodySmall, SecondaryButton } from "./DesignSystemStyles";

const Container = styled.div`
	display: flex;
	align-items: center;

	p {
		margin-left: 2rem;
	}
`;

const BrowseButton = ({ file, setFile }) => {
	// const [file, setFile] = useState(null);
	const inputRef = useRef(null);

	const onButtonClick = () => {
		inputRef.current.click();
	};

	const handleOnChange = (e) => {
		setFile(e.target.files[0]);
	};

	return (
		<Container>
			<input
				as="input"
				type="file"
				id="inputFile"
				accept=".pdf"
				ref={inputRef}
				onChange={handleOnChange}
				style={{ display: "none " }}
			>
				เลือกไฟล์
			</input>
			<SecondaryButton onClick={onButtonClick}>เลือกไฟล์</SecondaryButton>
			<BodySmall>{file?.name || ""}</BodySmall>
		</Container>
	);
};

export default BrowseButton;
