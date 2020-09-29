import styled from 'styled-components'

import backgroundImage from '../assets/login.jpg'

export const PrivateKeyDiv = styled.div`
  background-image: url(${backgroundImage});
  background-color: ${props => props.theme.colorBackGroundSecondary};
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: ${props => props.visible};
`

export const PrivateKeyPageTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.025) + 'px'};
  left: 0;
  width: ${props => props.theme.width + 'px'};
  text-align: center;
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontPageTitle.size};
  border: 0px ${props => props.theme.colorBackGroundSecondary};
  z-index: 1;
`

export const PrivateKeySection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colorBackgroundPrimary};
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
`

export const PrivateKeySectionTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.0875) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => props.theme.width + 'px'};
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontSectionTitle.size};
  border: 0px solid ${props => props.theme.colorPrimary};
  text-align: center;
`

export const PrivateKeyPin = styled.input`
  position: absolute;
  top: ${props => (props.theme.height * 0.15) + 'px'};
  left: ${props => (props.theme.width * 0.3) + 'px'};
  color: ${props => props.theme.colorTextDark};
  width: ${props => (props.theme.width * 0.4) + 'px'};
  height: ${props => props.theme.fontPin.size};
  font-size: ${props => props.theme.fontPin.size};
  border: 0px solid ${props => props.theme.colorPrimary};
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  text-align: center;

  :focus{
    outline: none;
  }
`

export const PrivateKeyPinCancelButton = styled.button`
  position: absolute;
  top: ${props => (props.theme.height * 0.225) + 'px'};
  left: ${props => (props.theme.width * 0.65/2) + 'px'};
  background-color: ${props => props.theme.colorButtonCancel};
  color: ${props => props.theme.colorTextLight};
  border: 0px solid ${props => props.theme.colorButtonCancel};
  font-size: ${props => props.theme.fontNormal.size};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  width: ${props => (props.theme.width * 0.35)+ 'px'};
  border-radius: ${props => (props.theme.height * 0.0475/2) + 'px'};

  :focus{
    outline: none;
  }
`

export const PrivateKeyAddress = styled.div`
  position: absolute;
  left: ${props => ((props.theme.width * 0.0875)) + 'px'};
  top: ${props => ((props.theme.height * 0.125))+ 'px'};
  width: ${props => ((props.theme.width * 0.8)) + 'px'};
  height: ${props => props.theme.fontNormal.size};
  background-color: ${props => props.theme.colorTirtiary};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontNormal.size};
  border: 0px solid ${props => props.theme.colorPrimary};
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  text-align: center;

  :focus{
    outline: none;
  }
`

export const PrivateKeyTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.1875) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => props.theme.width + 'px'};
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontSectionTitle.size};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
`

export const PrivateKeyString = styled.div`
  position: absolute;
  left: ${props => ((props.theme.width * 0.025)) + 'px'};
  top: ${props => ((props.theme.height * 0.225))+ 'px'};
  width: ${props => ((props.theme.width * 0.95)) + 'px'};
  height: ${props => ((props.theme.height * 0.1975))+ 'px'};
  background-color:  ${props => props.flash ? props.theme.colorTextLight : props.theme.colorTirtiary};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontNormal.size};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  word-wrap: break-word;
  text-align: center;

  :focus{
    outline: none;
  }
`

export const PrivateKeyQR = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.4475)) + 'px'};
  left: ${props => ((props.theme.width * 0.5)-(props.theme.height * 0.45/2)) + 'px'};
  width: ${props => ((props.theme.height * 0.45)) + 'px'};
  height: ${props => ((props.theme.height * 0.45)) + 'px'};
  border: 0px solid #000000;
  text-align: center;
`

export const PrivateKeyNewAddressSection = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.195)) + 'px'};
  left: 0;
  width: ${props => props.theme.width + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  display: inline-block;
`

export const PrivateKeyButtonSection = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.925)) + 'px'};
  left: 0;
  width: ${props => props.theme.width + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  display: inline-block;
`

export const PrivateKeyCopyButton = styled.button`
  position: absolute;
  background-color: ${props => props.theme.colorButtonAccept};
  color: ${props => props.theme.colorTextDark};
  border: 0px solid ${props => props.theme.colorButtonAccept};
  top: 0;
  left: ${props => (props.theme.width * 0.125)+ 'px'};
  font-size: ${props => props.theme.fontNormal.size};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  width: ${props => (props.theme.width * 0.35)+ 'px'};
  border-radius: ${props => (props.theme.height * 0.0475/2) + 'px'};

  :focus{
    outline: none;
  }
`

export const PrivateKeyCancelButton = styled.button`
  position: absolute;
  background-color: ${props => props.theme.colorButtonCancel};
  color: ${props => props.theme.colorTextLight};
  border: 0px solid ${props => props.theme.colorButtonCancel};
  top: 0;
  right: ${props => (props.theme.width * 0.125)+ 'px'};
  font-size: ${props => props.theme.fontNormal.size};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  width: ${props => (props.theme.width * 0.35)+ 'px'};
  border-radius: ${props => (props.theme.height * 0.0475/2) + 'px'};

  :focus{
    outline: none;
  }
`


export const PinSection = styled.div`
  display: ${props => props.visible};
`

export const KeySection = styled.div`
  display: ${props => props.visible};
`
