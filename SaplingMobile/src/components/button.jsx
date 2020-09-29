import styled from 'styled-components'

export const Button = styled.button`
  background: ${props => props.primary ? "white" : "yellow"};
  color: ${props => props.primary ? "white" : "black"};
  font-size: 14px;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;

  :focus{
    outline: none;
  }
`

export const GreyButton = styled.button`
  background-color: ${props => props.disabled !== true ? '#707070' : '#707070' };
  opacity: ${props => props.disabled !== true ? '1.0' : '0.3' };
  color: #000000;
  border: 0px solid ${props => props.disabled !== true ? '#707070' : '#707070' };
  font-size: ${props => props.theme.fontNormal.size};
  margin-top: ${props => (props.theme.height * 0.00125) + 'px'};
  margin-bottom: ${props => (props.theme.height * 0.00125) + 'px'};
  margin-left: ${props => (props.theme.width * 0.0125) + 'px'};
  margin-right: ${props => (props.theme.width * 0.0125) + 'px'};
  height: ${props => (props.theme.height * 0.0475) + 'px'};
  width: ${props => (props.theme.width * 0.475)+ 'px'};
  border-radius: 3px;

  :focus{
    outline: none;
  }
`

export const ModalGreyButton = styled.button`
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
