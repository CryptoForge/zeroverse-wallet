import styled from 'styled-components'

export const ChainSyncGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => (props.theme.height * 0.35) + 'px' };
  width: ${props => (props.theme.width) + 'px'};
  color: ${props => props.theme.colorSecondary};
  display: grid;
  grid-template-columns: 10px repeat(2,${props => (((props.theme.width) - 20)/2) + 'px'}) 10px;
  grid-template-rows: repeat(10, ${props => ((props.theme.height * 0.35)/10) + 'px'});
`
export const TitleDiv = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.02) + 'px'};
  left: ${props => (props.theme.height * 0.0125) + 'px'};
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontPageTitle.size};
  font-weight: bold;
  width: ${props => (((props.theme.width) - 20)) + 'px'};
`

export const AddressDiv = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.055) + 'px'};
  left: ${props => (props.theme.height * 0.0125) + 'px'};
  font-size: ${props => props.theme.fontPin.size};
  color: #ffffff;
  text-transform: capitalize;
`
export const LogoImg = styled.img`
  height: ${props => (props.theme.width * 0.25) + 'px' };
  width: ${props => (props.theme.width * 0.25) + 'px'};
`
export const ImgDiv = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.09) + 'px'};
  right: ${props => (props.theme.width * 0.125) + 'px' };
`
export const SyncDiv = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.11) + 'px'};
  left: ${props => (props.theme.height * 0.0125) + 'px'};
  font-size: ${props => props.theme.fontPin.size};
  text-transform: capitalize;
`
export const BalanceDiv = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.195) + 'px'};
  left: ${props => (props.theme.height * 0.0125) + 'px'};
  font-size: ${props => props.theme.fontSectionTitle.size};
  text-transform: capitalize;
`
export const BalanceNumberDiv = styled.div`
  color: ${props => props.theme.colorSecondary};
  font-size: ${props => props.theme.fontPin.size};
  font-weight: bold;
`

export const CurrencyDiv = styled.div`
  color: #ffffff;
  font-size: ${props => props.theme.fontSmall.size};
`
