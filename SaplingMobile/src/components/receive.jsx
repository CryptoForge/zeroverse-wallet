import styled from 'styled-components'

import backgroundImage from '../assets/login.jpg'

export const ReceiveGrid = styled.div`
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

export const ReceivePageTitle = styled.div`
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

export const ReceiveSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colorBackgroundPrimary};
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
`

export const ReceiveSectionOpaque = styled.div`
  text-align: center;
  background-color: rgba(0,0,0,0);
  color: ${props => props.theme.colorTextLight};
  border: 0px solid rgba(0,0,0,0);
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
`

export const ReceiveAddressSelect = styled.div`
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

export const ReceiveAddressSelectTitle = styled.div`
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

export const ReceiveAddress = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.275)) + 'px'};
  left: ${props => (props.theme.width * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.95) + 'px'};
  background-color: rgba(0,0,0,0);
  color: ${props => props.theme.colorTextLight};
  font-size: 14px;
  border: 0px solid #000000;
  text-align: left;
`

export const ReceiveTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.2925) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => props.theme.width + 'px'};
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontSectionTitle.size};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
`

export const ReceiveAddressTextArea = styled.textarea`
  position: absolute;
  left: ${props => ((props.theme.width * 0.025)) + 'px'};
  top: ${props => ((props.theme.height * 0.33))+ 'px'};
  width: ${props => (props.theme.width * 0.95) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  background-color: ${props => props.flash ? props.theme.colorTextLight : props.theme.colorTirtiary};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontNormal.size};
  border: 0px solid ${props => props.theme.colorPrimary};
  transition: 60ms;
  border-radius: 10px;

  :focus{
    outline: none;
  }
`

export const ReceiveQR = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.4475)) + 'px'};
  left: ${props => ((props.theme.width * 0.5)-(props.theme.height * 0.45/2)) + 'px'};
  width: ${props => ((props.theme.height * 0.45)) + 'px'};
  height: ${props => ((props.theme.height * 0.45)) + 'px'};
  border: 0px solid #000000;
  text-align: center;
`

export const ReceiveNewAddressSection = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.195)) + 'px'};
  left: 0;
  width: ${props => props.theme.width + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  border: 0px solid #000000;
  display: inline-block;
`

export const ReceiveButtonSection = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.925)) + 'px'};
  left: 0;
  width: ${props => props.theme.width + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  display: inline-block;
`

export const ReceiveCopyButton = styled.button`
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

export const ReceiveCancelButton = styled.button`
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

export const ReceiveNewTButton = styled.button`
  position: absolute;
  background-color: ${props => props.theme.colorSecondary};
  color: #000000;
  border: 0px solid ${props => props.theme.colorSecondary};
  top: 0;
  left: ${props => (props.theme.width * 0.125)+ 'px'};
  font-size: ${props => props.theme.fontNormal.size};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  width: ${props => (props.theme.width * 0.35)+ 'px'};
  border-radius: ${props => (props.theme.height * 0.0475/2) + 'px'};
  opacity: ${props => props.disabled !== true ? '1.0' : '0.3' };

  :focus{
    outline: none;
  }
`

export const ReceiveNewZButton = styled.button`
  position: absolute;
  background-color: ${props => props.theme.colorSecondary};
  color: #000000;
  border: 0px solid ${props => props.theme.colorSecondary};
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









export const ReceiveGreyButton = styled.button`
  background-color: #707070;
  color: #000000;
  border: 0px solid #707070;
  font-size: ${props => props.theme.fontNormal.size};
  margin-top: ${props => (props.theme.height * 0.00125) + 'px'};
  margin-bottom: ${props => (props.theme.height * 0.00125) + 'px'};
  margin-left: ${props => (props.theme.width * 0.0125) + 'px'};
  margin-right: ${props => (props.theme.width * 0.0125) + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  width: ${props => (props.theme.width * 0.35)+ 'px'};
  border-radius: 3px;

  :focus{
    outline: none;
  }
`
