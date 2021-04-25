import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";

import { blue } from "./Colors";

export const MenuContentContainer = styled.div`
	width: 12.7rem;
	display: flex;
	flex-direction: column;
	font-size: 1.2rem;
	margin: 0 0.7rem;
	padding: 1rem 0;
	border-bottom: 0.1rem solid ${(props) => props.theme.subText};
	cursor: default;
`;

export const MenuContent = styled.div`
	display: flex;
	justify-content: space-between;
	user-select: none;

	&:not(:first-child) {
		margin-top: 0.2rem;
	}

	span:last-child {
		color: ${blue};
	}
`;

export const MenuItemCustom = styled(MenuItem)`
	&.MuiMenuItem-root {
		font-family: "Kanit", arial, sans-serif;
		padding: 1rem;
		font-size: 1.2rem;
		justify-content: center;
		color: ${(props) => props.theme.mainText};

		&:hover {
			background: ${(props) => props.theme.menuItem.hover};
			color: ${(props) => props.theme.mainText};
		}

		&:active {
			background: ${(props) => props.theme.menuItem.active};
			color: ${(props) => props.theme.mainText};
		}
	}
`;

const MenuCustom = styled(Menu)`
	.MuiPaper-elevation0 {
		border: 0.1rem solid ${(props) => props.theme.mainText};
		background: ${(props) => props.theme.body};
		margin-top: 0.4rem;
		color: ${(props) => props.theme.mainText};
		box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.1);
	}

	.MuiList-padding {
		padding: 0;
	}
`;

const MenuPopup = (props) => {
	const { menu, setMenu, children } = props;

	return (
		<MenuCustom
			elevation={0}
			getContentAnchorEl={null}
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			openMenu={menu}
			id="more-menu"
			anchorEl={menu}
			keepMounted
			open={Boolean(menu)}
			onClose={() => setMenu(null)}
		>
			{children}
		</MenuCustom>
	);
};

export default MenuPopup;
