import { h } from 'preact';
import styled from 'styled-components'
import { Facebook, Twitter } from '../utility/Icons'
// import { getMobileOS } from '../utility/helper'

const SocialIcon = styled.a`
  cursor: pointer;
  height: 2.4rem;
  user-select: none;
`

const SocialIcons = () => {
    // const handleRedirect = () => {
    //     console.log(getMobileOS())
        
    //     if(getMobileOS() === 'android'){
    //         return `fb://profile/784451072347559`
    //     } 
    //     return `fb://page/784451072347559`
    // }
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