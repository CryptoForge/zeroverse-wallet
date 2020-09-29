import styled from 'styled-components'

import backgroundImage from '../assets/login.jpg'

export const WalletPage = styled.div`
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-color: ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
  border: 0px ${props => props.theme.colorBackGroundSecondary};
`

export const WalletPageTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height *0.05) + 'px'};
  left: 0;
  width: ${props => props.theme.width + 'px'};
  background-color: ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontPageTitle.size};
  border: 0px ${props => props.theme.colorBackGroundSecondary};
  z-index: 1;
`

export const WalletSection = styled.div`
  text-align: center;
  background-color: ${props => props.theme.colorBackgroundPrimary};
  border: 0px solid ${props => props.theme.colorPrimary};
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  position: absolute;
  top: 0;
  left: 0;
`

export const WalletSectionTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.125) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => props.theme.width + 'px'};
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontSectionTitle.size};
  border: 0px solid ${props => props.theme.colorPrimary};
  text-align: center;
`

export const WalletSpinner = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.5) - 50 + 'px'};
  left: ${props => (props.theme.width * 0.5) - 50 + 'px'};
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontSectionTitle.size};
  border: 0px solid ${props => props.theme.colorPrimary};
  text-align: center;
`


export const WalletKey = styled.textarea`
  position: absolute;
  left: ${props => ((props.theme.width * 0.1)) + 'px'};
  top: ${props => ((props.theme.height * 0.175))+ 'px'};
  width: ${props => ((props.theme.width * 0.8)) + 'px'};
  height: ${props => ((props.theme.height * 0.2))+ 'px'};
  background-color: ${props => props.theme.colorTirtiary};
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

export const WalletKeyInvalid = styled.div`
  position: absolute;
  left: ${props => ((props.theme.width * 0.1)) + 'px'};
  top: ${props => ((props.theme.height * 0.1625))+ 'px'};
  width: ${props => ((props.theme.width * 0.8)) + 'px'};
  background-color: ${props => props.theme.colorBackGroundSecondary};
  color: ${props => props.theme.colorButtonCancel};
  font-size: ${props => props.theme.fontSmall.size};
  border: 0px solid ${props => props.theme.colorPrimary};
  border-radius: 10px;
  text-align: center;

  :focus{
    outline: none;
  }
`

export const WalletBirthdayTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.425) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => props.theme.width + 'px'};
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontSectionTitle.size};
  border: 0px solid ${props => props.theme.colorPrimary};
  text-align: center;
`

export const WalletBirthday = styled.textarea`
  position: absolute;
  left: ${props => ((props.theme.width * 0.35)) + 'px'};
  top: ${props => ((props.theme.height * 0.475))+ 'px'};
  width: ${props => ((props.theme.width * 0.3)) + 'px'};
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


export const WalletPhraseButton = styled.button`
  position: absolute;
  top: ${props => (props.theme.height * 0.80) +'px'};
  left: ${props => (props.theme.width * 0.1) +'px'};
  width: ${props => (props.theme.width * 0.375) +'px'};
  height: ${props => (props.theme.height * 0.075) +'px'};
  background-color: ${props => props.theme.colorSecondary};
  color: ${props => props.theme.colorTextDark};
  font-size: ${props => props.theme.fontNormal.size};
  border-radius: ${props => (props.theme.height * 0.075/2) +'px'};
  border: 0px solid ${props => props.theme.colorSecondary};

  :focus{
    outline: none;
  }
`


export const WalletSetButton = styled.button`
  position: absolute;
  top: ${props => (props.theme.height * 0.9) +'px'};
  right: ${props => (props.theme.width * 0.1) +'px'};
  width: ${props => (props.theme.width * 0.80) +'px'};
  height: ${props => (props.theme.height * 0.075) +'px'};
  background-color: ${props => props.theme.colorButtonAccept};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontNormal.size};
  border-radius: ${props => (props.theme.height * 0.075/2) +'px'};
  border: 0px solid ${props => props.theme.colorSecondary};

  :focus{
    outline: none;
  }
`

export const WalletCancelButton = styled.button`
  position: absolute;
  top: ${props => (props.theme.height * 0.8) +'px'};
  right: ${props => (props.theme.width * 0.1) +'px'};
  width: ${props => (props.theme.width * 0.375) +'px'};
  height: ${props => (props.theme.height * 0.075) +'px'};
  background-color: ${props => props.theme.colorButtonCancel};
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontNormal.size};
  border-radius: ${props => (props.theme.height * 0.075/2) +'px'};
  border: 0px solid ${props => props.theme.colorSecondary};

  :focus{
    outline: none;
  }
`

export const WalletCreateNewButton = styled.button`
  position: absolute;
  left: ${props => (props.theme.width * 0.10 ) +'px'};
  bottom: ${props => (props.theme.height * 0.125) +'px'};
  background-color: ${props => props.theme.colorSecondary};
  color: ${props => props.theme.colorTextDark};
  font-size: ${props => props.theme.fontNormal.size};
  width: ${props => (props.theme.width * 0.80 ) +'px'};
  height: ${props => (props.theme.height * 0.075) +'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) +'px'};
  border: 0px solid ${props => props.theme.colorPrimary};

  :focus{
    outline: none;
  }
`

export const WalletRecoverOldButton = styled.button`
  position: absolute;
  left: ${props => (props.theme.width * 0.10 ) +'px'};
  bottom: ${props => (props.theme.height * 0.025) +'px'};
  background-color: ${props => props.theme.colorSecondary};
  color: ${props => props.theme.colorTextDark};
  font-size: ${props => props.theme.fontNormal.size};
  width: ${props => (props.theme.width * 0.80) +'px'};
  height: ${props => (props.theme.height * 0.075) +'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) +'px'};
  border: 0px solid ${props => props.theme.colorPrimary};

  :focus{
    outline: none;
  }
`
