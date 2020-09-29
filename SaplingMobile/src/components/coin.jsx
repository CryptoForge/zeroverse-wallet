import styled from 'styled-components'

import backgroundImage from '../assets/login.jpg'

export const CoinDiv = styled.div`
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
`

export const CoinSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colorBackgroundPrimary};
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
`

export const CoinPageTitle = styled.div`
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

export const CoinCancelButton = styled.button`
  position: absolute;
  background-color: ${props => props.theme.colorButtonCancel};
  color: ${props => props.theme.colorTextLight};
  border: 0px solid ${props => props.theme.colorButtonCancel};
  top: ${props => ((props.theme.height * 0.925)) + 'px'};
  left: ${props => (props.theme.width * (0.5 - (0.35/2)))+ 'px'};
  font-size: ${props => props.theme.fontNormal.size};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  width: ${props => (props.theme.width * 0.35)+ 'px'};
  border-radius: ${props => (props.theme.height * 0.0475/2) + 'px'};

  :focus{
    outline: none;
  }
`

export const CoinIcon = styled.img`
  height: ${props => (props.theme.width * 0.15) + 'px'};
  width: ${props => (props.theme.width * 0.15) + 'px'};
  margin: 0;
  padding: 0;
  border: 0;
`

export const CoinName = styled.div`
  font-size: ${props => props.theme.fontPin.size};
  color: ${props => props.theme.colorTextLight};
  width: ${props => (props.theme.width * 0.225) + 'px'};
  border: 0px solid ${props => props.theme.colorSecondary};
  margin: 0;
  padding: 0;
  border: 0;
  text-align: center;
  text-transform: capitalize;
`

export const CoinSelectSection = styled.div`
  position: absolute;
  background-color: ${props => props.theme.colorTirtiary};
  top: ${props => (props.theme.height * 0.125) - 5 + 'px'};
  left: ${props => (props.theme.width * 0.05) - 5 + 'px'};
  height: ${props => (props.theme.height * (props.withError ? 0.4 : 0.725)) + 'px'};
  width: ${props => (props.theme.width * 0.9) + 'px'};
  border-radius: 35px;
  border: 5px solid ${props => props.theme.colorSecondary};
  text-align: center;
`

export const CoinErrorSection = styled.div`
  position: absolute;
  background-color: ${props => props.theme.colorTirtiary};
  color: ${props => props.theme.colorTextLight};
  top: ${props => (props.theme.height * 0.55) - 5 + 'px'};
  left: ${props => (props.theme.width * 0.05) - 5 + 'px'};
  height: ${props => (props.theme.height * (props.withError ? 0.325 : 0)) + 'px'};
  width: ${props => (props.theme.width * 0.9) + 'px'};
  border-radius: 35px;
  border: 5px solid ${props => props.theme.colorSecondary};
  text-align: center;
  display: ${props => props.withError ? 'visible' : 'none'}
`

export const CoinButtonFloat = styled.button`
  float: ${props => props.float ? 'left' : 'none'};
  background-color: ${props => props.theme.colorBackGroundSecondary};
  height: ${props => (props.theme.width * 0.225) + 'px'};
  width: ${props => (props.theme.width * 0.225) + 'px'};
  border: 0px solid ${props => props.theme.colorSecondary};
  border-radius: ${props => (props.theme.height * 0.0475/2) + 'px'};
  margin: ${props => (props.theme.width * 0.0375) + 'px'};
  padding: 0;
  text-align: center;

  :focus{
    outline: none;
  }
`

export const CoinSpinner = styled.div`
  position: absolute;
  background-color: ${props => props.theme.colorBackGroundSecondary};
  top: ${props => (props.theme.height * 0.125) + 'px'};
  left: ${props => (props.theme.width * 0.05)  + 'px'};
  height: ${props => (props.theme.height * 0.5 ) + 'px'};
  width: ${props => (props.theme.width * 0.8) + 'px'};
  font-size: ${props => props.theme.fontSectionTitle.size};
  color: ${props => props.theme.colorSecondary};
  text-align: center;
`
