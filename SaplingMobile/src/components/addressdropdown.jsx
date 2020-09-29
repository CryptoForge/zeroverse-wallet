import styled from 'styled-components'

export const AddressDiv = styled.div`
  position: relative;
  text-align: left;
  z-index: 3;
`
export const AddressDropdownContent = styled.div`
  display: ${props => props.visible};
  width: ${props => ((props.theme.width) * 0.95) + 'px'};
  font-size: ${props => props.theme.fontPin.size};
  background-color: rgba(0,0,0,0);
  color: #ffffff;
  border: 0px;
`
export const AddressDropdownButton = styled.button`
  width: ${props => ((props.theme.width) * 0.95) + 'px'};
  font-size: ${props => props.theme.fontNormal.size};
  background-color: rgba(0,0,0,0);
  color: #ffffff;
  border: 0px;
  text-align: left;

  :focus{
    outline: none;
  }
`
export const AddressDropdownButtonLine = styled.button`
  width: ${props => ((props.theme.width) * 0.95) + 'px'};
  background-color: rgba(0,0,0,0);
  color: #ffffff;
  font-size: ${props => props.theme.fontNormal.size};
  border: 0px;
  text-align: left;

  :focus{
    outline: none;
  }
`
