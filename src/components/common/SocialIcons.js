import { h } from 'preact';
import styled from 'styled-components'
import { Facebook, Twitter } from '../utility/Icons'

const SocialIcon = styled.a`
  cursor: pointer;
  height: 2.4rem;
  user-select: none;
`

const SocialIcons = () => {
    return (
        <>
            <SocialIcon
            href="https://fb.com/kuclap/"
            target="_blank"
            rel="noopener noreferrer">
                <Facebook />
            </SocialIcon>
            <SocialIcon
            href="https://twitter.com/KUclapOfficial"
            target="_blank"
            rel="noopener noreferrer">
                    <Twitter />
            </SocialIcon>   
        </>
    );
};

export default SocialIcons;