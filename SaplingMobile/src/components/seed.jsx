import styled from 'styled-components'

import backgroundImage from '../assets/login.jpg'

export const SeedDiv = styled.div`
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

export const SeedPageTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height *0.025) + 'px'};
  left: 0;
  width: ${props => props.theme.width + 'px'};
  text-align: center;
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontPageTitle.size};
  border: 0px ${props => props.theme.colorBackGroundSecondary};
  z-index: 1;
`

export const SeedSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colorBackgroundPrimary};
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
`

export const SeedSectionTitle = styled.div`
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

export const SeedPin = styled.input`
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

export const SeedPinCancelButton = styled.button`
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

export const SeedPhraseTextArea = styled.textarea`
  position: absolute;
  left: ${props => ((props.theme.width * 0.1)) + 'px'};
  top: ${props => ((props.theme.height * 0.15))+ 'px'};
  width: ${props => ((props.theme.width * 0.8)) + 'px'};
  height: ${props => ((props.theme.height * 0.125))+ 'px'};
  background-color: ${props => props.flash ? props.theme.colorTextLight : props.theme.colorTirtiary};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontNormal.size};
  border: 0px solid ${props => props.theme.colorPrimary};
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;

  :focus{
    outline: none;
  }
`

export const SeedBirthdayTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.325) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => props.theme.width + 'px'};
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontSectionTitle.size};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
`

export const SeedBirthdayTextArea = styled.textarea`
  position: absolute;
  left: ${props => ((props.theme.width * 0.35)) + 'px'};
  top: ${props => ((props.theme.height * 0.375))+ 'px'};
  width: ${props => ((props.theme.width * 0.3)) + 'px'};
  height: ${props => props.theme.fontNormal.size};
  background-color: ${props => props.theme.colorTirtiary};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontNormal.size};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  text-align: center;

  :focus{
    outline: none;
  }
`

export const SeedQR = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.4475)) + 'px'};
  left: ${props => ((props.theme.width * 0.5)-(props.theme.height * 0.45/2)) + 'px'};
  width: ${props => ((props.theme.height * 0.45)) + 'px'};
  height: ${props => ((props.theme.height * 0.45)) + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
`

export const SeedNewAddressSection = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.195)) + 'px'};
  left: 0;
  width: ${props => props.theme.width + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  display: inline-block;
`

export const SeedButtonSection = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.925)) + 'px'};
  left: 0;
  width: ${props => props.theme.width + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  display: inline-block;
`

export const SeedCopyButton = styled.button`
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

export const SeedCancelButton = styled.button`
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






export const SeedGreyButton = styled.button`
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
