import styled from 'styled-components'

import backgroundImage from '../assets/login.jpg'

export const MainGrid = styled.div`
  background-image: url(${backgroundImage});
  background-color: #cccccc;
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  display: ${props => props.visible};
`

export const UpperButtonSection = styled.div`
  height: ${props => (props.theme.height * 0.05) + 'px'};
  width: ${props => props.theme.width + 'px'};
  display: inline-block;
  position: absolute;
  bottom: ${props => (props.theme.height * 0.015) + 'px'};
  left: 0;
  opacity: 1;
`

export const MainSendButton = styled.button`
  position: absolute;
  background-color: ${props => props.theme.colorSecondary};
  color: #000000;
  border: 0px solid ${props => props.theme.colorSecondary};
  top: 0;
  left: ${props => (props.theme.width * 0.03333)+ 'px'};
  font-size: ${props => props.theme.fontNormal.size};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  width: ${props => (props.theme.width * 0.45)+ 'px'};
  border-radius: ${props => (props.theme.height * 0.0475/2) + 'px'};
  opacity: ${props => props.disabled !== true ? '1.0' : '0.3' };

  :focus{
    outline: none;
  }
`

export const MainReceiveButton = styled.button`
  position: absolute;
  background-color: ${props => props.theme.colorSecondary};
  color: #000000;
  border: 0px solid ${props => props.theme.colorSecondary};
  top: 0;
  right: ${props => (props.theme.width * 0.03333)+ 'px'};
  font-size: ${props => props.theme.fontNormal.size};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  width: ${props => (props.theme.width * 0.45)+ 'px'};
  border-radius: ${props => (props.theme.height * 0.0475/2) + 'px'};

  :focus{
    outline: none;
  }
`

export const UpperSection = styled.div`
  height: ${props => (props.theme.height * 0.40) + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-color: #000000;
  color: #ffffff;
  position: absolute;
  top: ${props => (props.theme.height * 0.05) + 'px'};
  left: 0;
  opacity: 0.80;
`

export const UpperSectionOpaque = styled.div`
  height: ${props => (props.theme.height * 0.40) + 'px'};
  width: ${props => props.theme.width + 'px'};
  color: #ffffff;
  position: absolute;
  top: ${props => (props.theme.height * 0.05) + 'px'};
  left: 0;
  opacity: 1;
`
export const LowerButtonSection = styled.div`
  height: ${props => (props.theme.height * 0.05) + 'px'};
  width: ${props => props.theme.width + 'px'};
  display: inline-block;
  background-color: #000000;
  position: absolute;
  bottom: 0
  left: 0;
  opacity: 1;
`
// export const LowerSection = styled.div`
//   height: ${props => (props.theme.height * 0.55) + 'px'};
//   width: ${props => props.theme.width + 'px'};
//   background-color: #000000;
//   color: #ffffff;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   opacity: 0.75;
// `
export const LowerSection = styled.div`
  height: ${props => (props.theme.height * 0.55) + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-color: ${props => props.theme.colorBackgroundPrimary};
  color: ${props => props.theme.colorTextLight};
  position: absolute;
  bottom: 0;
  left: 0;
`

export const Menu = styled.div`
  position: absolute;
  top: 0
  left: 0
  height: ${props => (props.theme.height * 0.05) + 'px'};
  width: ${props => props.theme.width + 'px'};
  display: block;
  background-color: ${props => props.theme.colorBackgroundPrimary};
  color: ${props => props.theme.colorSecondary};
  display: ${props => props.visible};
  text-align: center;
`

export const MenuTitle = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.025)) + 'px'};
  left: 0;
  font-size: ${props => props.theme.fontPageTitle.size};
  text-align: center;
  background-color: ${props => props.theme.colorBackGroundSecondary};
  color: ${props => props.theme.colorSecondary};
  width: ${props => (props.theme.width) + 'px'};
  z-index: 1;
`

export const MenuContent = styled.div`
  display: ${props => props.visible};
  position: absolute;
  top: ${props => ((props.theme.height * 0.075)) + 'px'};
  left: 0
  background-color: ${props => props.theme.colorBackgroundPrimary};
  height: ${props => ((props.theme.height * 0.05) * props.size) + 'px'};
  width: ${props => ((props.theme.width * 0.45)) + 'px'};
  z-index: 2;
`
export const MenuButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colorBackGroundSecondary};
  width: ${props => ((props.theme.height * 0.075)) + 'px'};
  height: ${props => ((props.theme.height * 0.075)) + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  z-index: 2;
  text-align: center;

  :focus{
    outline: none;
  }
`

export const MenuButtonImg = styled.img `
  position: absolute;
  top: ${props => ((props.theme.height * 0.0125)) + 'px'};
  left: ${props => ((props.theme.height * 0.0125)) + 'px'};
  width: ${props => ((props.theme.height * 0.05)) + 'px'};
  height: ${props => ((props.theme.height * 0.05)) + 'px'};
`

export const MenuButtonLine = styled.button`
  position: absolute;
  top: ${props => ((props.theme.height * 0.05) * props.pos) + 'px'};
  left: 0;
  background-color: ${props => props.theme.colorBackgroundPrimary};
  color: ${props => props.theme.colorTextLight};
  width: ${props => ((props.theme.width * 0.45)) + 'px'};
  height: ${props => ((props.theme.height * 0.05)) + 'px'};
  font-size: ${props => props.theme.fontPin.size};
  border: 0px solid ${props => props.theme.colorBackgroundPrimary};
  z-index: 2;

  :focus{
    outline: none;
  }
`
