import styled from 'styled-components'

import backgroundImage from '../assets/login.jpg'

export const SendDiv = styled.div`
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

export const SendPageTitle = styled.div`
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

export const SendSectionOverScroll = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colorBackGroundSecondary};
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
  display: ${props => props.visible};
  overflow: scroll;
  overscroll-behavior: contain;
`

export const SendSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colorBackgroundPrimary};
  height: ${props => props.theme.height * 1.5 + 'px'};
  width: ${props => props.theme.width + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
  display: ${props => props.visible};
`

export const SpinnerSection = styled.div`
  height: ${props => props.theme.height * 0.90 + 'px'};
  width: ${props => props.theme.width + 'px'};
  position: absolute;
  bottom: 0
  left: 0;
  display: ${props => props.visible};
`

export const AddressSelectSection = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.95) + 'px'};
  height: ${props => (props.theme.height * 0.15) + 'px'};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontSectionTitle.size};
  display: ${props => props.visible};
  text-align: left;
`

export const AddressSelectHeading = styled.div`
  color: ${props => props.theme.colorSecondary};
  font-weight: bold;
  font-size: ${props => props.theme.fontSectionTitle.size};
`

export const AddressBalanceNumberDiv = styled.div`
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontPin.size};
  font-weight: bold;
`

export const AddressCurrencyDiv = styled.div`
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontSmall.size};
`




export const SendAddressSection = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.265) + 'px'};
  left: ${props => (props.theme.width * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.95) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontSectionTitle.size};
  font-weight: bold;
  text-align: left;
`

export const SendAddress = styled.textarea`
  width: ${props => ((props.theme.width * 0.95) - 2) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  background-color: ${props => props.theme.colorTirtiary};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontNormal.size};
  border-radius: 10px;
  border: 1px solid ${props => props.theme.colorTextLight};
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
  padding-left: 5px;

  :focus{
    outline: none;
  }
`

export const AmountSection = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.615) + 'px'};
  left: ${props => (props.theme.width * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.95) + 'px'};
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontPin.size};
  text-align: left;
  font-weight: bold;
`

export const AmountInput = styled.input`
  background-color: ${props => props.theme.colorTirtiary};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontPin.size};
  width: ${props => (props.theme.width * 0.35) + 'px'};
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colorTextLight};
  padding-left: 5px;

  :focus{
    outline: none;
  }
`

export const FeeSection = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.675) + 'px'};
  left: ${props => (props.theme.width * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.95) + 'px'};
  height: ${props => (props.theme.height * 0.035) + 'px'};
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontPin.size};
  text-align: left;
  font-weight: bold;
`




export const MemoSection = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.4) + 'px'};
  left: ${props => (props.theme.width * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.95) + 'px'};
  height: ${props => (props.theme.height * 0.15) + 'px'};
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontSectionTitle.size};
  font-weight: bold;
  text-align: left;
`

export const MemoArea = styled.textarea`
  width: ${props => ((props.theme.width * 0.95) - 2) + 'px'};
  height: ${props => (props.theme.height * 0.15) + 'px'};
  background-color: ${props => props.theme.colorTirtiary};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontNormal.size};
  border-radius: 10px;
  border: 1px solid ${props => props.theme.colorTextLight};
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
  padding-left: 5px;
  :focus{
    outline: none;
  }
`


export const QRButton = styled.button`
  position: absolute;
  top: ${props => (props.theme.height * 0.725) + 'px'};
  right: ${props => (props.theme.width * 0.025) + 'px'};
  background-color: #707070;
  color: #000000;
  border: 0px solid #707070;
  font-size: ${props => props.theme.fontNormal.size};
  margin-top: ${props => (props.theme.height * 0.00125) + 'px'};
  margin-bottom: ${props => (props.theme.height * 0.00125) + 'px'};
  margin-left: ${props => (props.theme.width * 0.0125) + 'px'};
  margin-right: ${props => (props.theme.width * 0.0) + 'px'};
  height: ${props => (props.theme.height * 0.08) + 'px'};
  width: ${props => (props.theme.height * 0.08)+ 'px'};
  border-radius: 3px;
`


export const ButtonTopSection = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.8525)) + 'px'};
  left: 0;
  width: ${props => props.theme.width + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  display: inline-block;
`
export const ButtonBottomSection = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.925)) + 'px'};
  left: 0;
  width: ${props => props.theme.width + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  display: inline-block;
`


export const SendOkButton = styled.button`
  position: absolute;
  background-color: ${props => props.theme.colorButtonAccept};
  color: ${props => props.theme.colorTextlight};
  border: 0px solid ${props => props.theme.colorButtonAccept};
  top: 0;
  left: ${props => (props.theme.width * 0.125)+ 'px'};
  font-size: ${props => props.theme.fontNormal.size};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  width: ${props => (props.theme.width * 0.75)+ 'px'};
  border-radius: ${props => (props.theme.height * 0.0475/2) + 'px'};
  opacity: ${props => props.disabled !== true ? '1.0' : '0.1' };

  :focus{
    outline: none;
  }
`
export const SendQrButton = styled.button`
  position: absolute;
  background-color: ${props => props.theme.colorSecondary};
  color: ${props => props.theme.colorTextLight};
  border: 0px solid ${props => props.theme.colorSecondary};
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

export const SendCancelButton = styled.button`
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











export const ConfirmHeading = styled.div`
  width: ${props => (props.theme.width * 0.9) + 'px'};
  position: absolute;
  top: ${props => (props.theme.height * 0.03) + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: ${props => props.theme.colorTextLight};
  font-weight: bold;
  font-size: ${props => props.theme.fontSectionTitle.size};
`
export const ConfirmDataSection = styled.div`
  width: ${props => (props.theme.width * 0.9) + 'px'};
  position: absolute;
  top: ${props => (props.theme.height * 0.065) + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontNormal.size};
`

export const ConfirmData = styled.div`
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontNormal.size};
  width: ${props => (props.theme.width * 0.9) + 'px'};
  word-wrap: break-word;
`
export const ConfirmButtonSection = styled.div`
  width: ${props => (props.theme.width * 0.9) + 'px'};
  height: ${props => (props.theme.height * 0.035) + 'px'};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontNormal.size};
  display: inline-block;
`

export const ConfirmSendButton = styled.button`
  background-color: ${props => props.disabled !== true ? '#32CD32' : '#707070' };
  opacity: ${props => props.disabled !== true ? '1.0' : '0.3' };
  color: #000000;
  border: 0px solid ${props => props.disabled !== true ? '#32CD32' : '#707070' };
  font-size: ${props => props.theme.fontNormal.size};
  margin-top: ${props => (props.theme.height * 0.00125) + 'px'};
  margin-bottom: ${props => (props.theme.height * 0.00125) + 'px'};
  margin-left: ${props => (props.theme.width * 0.0125) + 'px'};
  margin-right: ${props => (props.theme.width * 0.0125) + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  width: ${props => (props.theme.width * 0.425)+ 'px'};
  border-radius: 3px;

  :focus{
    outline: none;
  }
`

export const ConfirmCancelButton = styled.button`
  background-color: #FF0000;
  color: #000000;
  border: 0px solid #FF0000;
  font-size: ${props => props.theme.fontNormal.size};
  margin-top: ${props => (props.theme.height * 0.00125) + 'px'};
  margin-bottom: ${props => (props.theme.height * 0.00125) + 'px'};
  margin-left: ${props => (props.theme.width * 0.0125) + 'px'};
  margin-right: ${props => (props.theme.width * 0.0125) + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  width: ${props => (props.theme.width * 0.425)+ 'px'};
  border-radius: 3px;

  :focus{
    outline: none;
  }
`

export const ConfirmPasswordSection = styled.div`
  display: ${props => props.visible};
`
export const ConfirmPassword = styled.h2`
  color: white;
  text-align: center;
  opacity: 1;
  font-size: 16px;
`

export const ConfirmPin = styled.input`
  color: black;
  width: ${props => (props.theme.width * 0.4) + 'px'};
  margin: 0 auto;
  bottom-border: 2px solid white;
  font-size: 18px;
  opacity: 1;
  text-align: center;
  border-radius: 20px;
  :focus{
    outline: none;
  }
`

export const TransactionLink = styled.a`

  width: ${props => (props.theme.width * 0.9) + 'px'};
  font-size: ${props => props.theme.fontSectionTitle.size};
  font-weight: bold;


  :link {
    color: gold;
    text-align: center;
  }

  :visited {
    color: white;
    text-align: center;
  }
`
