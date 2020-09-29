import styled from 'styled-components'

import backgroundImage from '../assets/login.jpg'

export const TransactionDetailDiv = styled.div`
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

export const TransactionDetailPageTitle = styled.div`
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

export const TransactionDetailSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colorBackgroundPrimary};
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  text-align: center;
`

export const TransactionDetailData = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.1) + 'px'};
  left: ${props => (props.theme.width * 0.025) + 'px'};
  height: ${props => (props.theme.height * 0.775)   + 'px'};
  width: ${props => (props.theme.width * 0.95) + 'px'};
  background-color: ${props => props.theme.colorBackGroundSecondary};
  color: ${props => props.theme.colorSecondary};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  font-size: ${props => props.theme.fontNormal.size};
  word-wrap: break-word;
  text-align: left;
  display: block;
`

export const TransactionDetailLine = styled.div`
  display: block;
`

export const TransactionDetailLineHeader= styled.div`
  color: ${props => props.theme.colorTextLight};
  font-size: ${props => props.theme.fontPin.size};
  word-wrap: break-word;
`

export const TransactionDetailLineData= styled.div`
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontNormal.size};
  word-wrap: break-word;
`










export const TransactionDetailButtonSection = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.925)) + 'px'};
  left: 0;
  width: ${props => props.theme.width + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};
  display: inline-block;
`




export const TransactionDetailExplorerButton = styled.button`
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

export const TransactionDetailCloseButton = styled.button`
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
