import styled from "styled-components"
import Menu from '@material-ui/core/Menu'

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
`

const MenuPopup = (props) => {
    const { menu, setMenu, children } = props 

    return (
        <MenuCustom
            elevation={0}
            getContentAnchorEl={null}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            openMenu={menu}
            id="more-menu"
            anchorEl={menu}
            keepMounted
            open={Boolean(menu)}
            onClose={() => setMenu(null)}>
            {children}
        </MenuCustom>
    )
}

export default MenuPopup
