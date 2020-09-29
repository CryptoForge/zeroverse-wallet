import styled from 'styled-components'

export const ListDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => (props.theme.height * 0.6) + 'px'};
  overflow: scroll;
  overscroll-behavior: contain;
`

export const TransactionUl = styled.ul`
  list-style-type: none;
  overflow: hidden;
  margin: 0;
  padding: 0;
`

export const TransactionLi = styled.li`
  display: grid;
  padding: 0;
  margin: 0;
  text-align: center;
  grid-template-columns: ${props => ((props.theme.width) * 0.05) + 'px '}
                         ${props => ((props.theme.width) * 0.41) + 'px '}
                         ${props => ((props.theme.width) * 0.08) + 'px '}
                         ${props => ((props.theme.width) * 0.41) + 'px '}
                         ${props => ((props.theme.width) * 0.05) + 'px'};
`

export const Col1Div = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
  margin: 0;
  padding: 0;
  width: ${props => ((props.theme.width) * 0.05) + 'px'};
`

export const Col2Div = styled.div`
  grid-column-start: 2;
  grid-column-end: 2;
  margin: 0;
  padding: 0;
  width: ${props => ((props.theme.width) * 0.41) + 'px'};
  color: ${props => props.header ? props.theme.colorSecondary : props.theme.colorTextLight};
  font-weight: ${props => props.header ? 'bold' : 'normal'};
  font-size: ${props => props.header ? props.theme.fontSectionTitle.size : props.theme.fontNormal.size};
  text-align: ${props => props.header ? 'center' : 'left'};
`

export const Col3Div = styled.div`
  width: ${props => ((props.theme.width) * 0.08) + 'px'};
  grid-column-start: 3;
  grid-column-end: 3;
  margin: 0;
  padding: 0;
`

export const Col4Div = styled.div`
  grid-column-start: 4;
  grid-column-end: 4;
  margin: 0;
  padding: 0;
  width: ${props => ((props.theme.width) * 0.41) + 'px'};
  color: ${props => props.header ? props.theme.colorSecondary : props.theme.colorTextLight};
  font-weight: ${props => props.header ? 'bold' : 'normal'};
  font-size: ${props => props.header ? props.theme.fontPin.size : props.theme.fontNormal.size};
  text-align: ${props => props.header ? 'center' : 'right'};
`

export const Col5Div = styled.div`
  width: ${props => ((props.theme.width) * 0.05) + 'px'};
  grid-column-start: 5;
  grid-column-end: 5;
  margin: 0;
  padding: 0;
`
export const Spacer = styled.div`
  min-height: ${props => (props.theme.height * 0.005) + 'px'};

`

export const PageSpacer = styled.div`
  min-height: ${props => (props.theme.height * 0.1) + 'px'};

`
export const ArrowImg = styled.img`
  max-width: ${props => ((props.theme.width) * 0.04) + 'px'};
  max-height: ${props => (props.theme.height * 0.025) + 'px'};
`

export const TransactionButton = styled.button`
  color: ${props => props.theme.colorTextLight};
  margin: 0;
  padding: 0;
  background-color: ${props => props.theme.colorBackGroundSecondary};
  border: 0px solid ${props => props.theme.colorBackGroundSecondary};

  :focus{
    outline: none;
  }
`
