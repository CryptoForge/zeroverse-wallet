import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { privateKey } from '../utils/litewallet'

import { setAddress,
         setBalance,
         setPrivateKey} from '../actions/Context'

import { setAddressList } from '../actions/MainSubPage'
// import { coins } from '../utils/coins.js'

import { AddressDiv,
         AddressDropdownButton,
         AddressDropdownContent,
         AddressDropdownButtonLine} from '../components/addressdropdown'

class AddressDropdown extends React.Component {

  constructor (props) {
    super(props)


    this.toggleList = this.toggleList.bind(this)
    this.setZAddress = this.setZAddress.bind(this)
    this.setTAddress = this.setTAddress.bind(this)
  }

    async setZAddress(z) {
      this.props.setAddress(this.props.context.zAddresses[z].address)
      this.props.setBalance(this.props.context.zAddresses[z].balance)
      var pk = await privateKey(this.props.context.zAddresses[z].address)
      pk = JSON.parse(pk)
      this.props.setPrivateKey(pk[0].private_key)
  }
    async setTAddress(t) {
      this.props.setAddress(this.props.context.tAddresses[t].address)
      this.props.setBalance(this.props.context.tAddresses[t].balance)
      var pk = await privateKey(this.props.context.tAddresses[t].address)
      pk = JSON.parse(pk)
      this.props.setPrivateKey(pk[0].private_key)
  }


    toggleList () {
      if (this.props.mainSubPage.addressList == 'visible') {
        this.props.setAddressList('none')
      } else {
        this.props.setAddressList('visible')
      }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }


    render() {

      var showType = 0
      if (this.props.mainSubPage.receivePage == 'visible' || this.props.mainSubPage.privateKeyPage == 'visible') {
        showType = 1
      }

      var menuLine = []
      var pos = -1

      for(var i = 0; i < this.props.context.zAddresses.length; i++) {
        var zaddr = this.props.context.zAddresses[i].address
        var zbal = this.props.context.zAddresses[i].balance
        if (zbal > 0 || showType == 1) {
          pos++
          menuLine.push(
          <AddressDropdownButtonLine
          value = {i}

          pos={pos}
          onClick={ e  => {
            e.stopPropagation()
            this.toggleList()
            this.setZAddress(e.target.value)
          }}
          >
          {zaddr.substring(0,8)
            + '...'
            + zaddr.substring(zaddr.length-8,zaddr.length)
            + (showType == 1 ? '' : '   '  + (zbal/1e8).toFixed(8).toString() + ' Zer')}
          </AddressDropdownButtonLine>)
        }
      }

      for(var j = 0; j < this.props.context.tAddresses.length; j++) {
        var taddr = this.props.context.tAddresses[j].address
        var tbal = this.props.context.tAddresses[j].balance
        if (tbal > 0 || showType == 1) {
          pos++
          menuLine.push(
            <AddressDropdownButtonLine
            value = {j}

            pos={pos}
            onClick={ e => {
              e.stopPropagation()
              this.toggleList()
              this.setTAddress(e.target.value)
            }}
            >
            {taddr.substring(0,8)
              + '...'
              + taddr.substring(taddr.length-8,taddr.length)
              + (showType == 1 ? '' : '   '  + (tbal/1e8).toFixed(8).toString() + ' Zer')}
            </AddressDropdownButtonLine>)
        }
      }
      pos++

      var listOpen
      if (this.props.mainSubPage.addressList == 'visible') {
        listOpen = 'none'
      } else {
        listOpen = 'block'
      }

      var addr = this.props.context.address
      addr = addr.substring(0,8) + '...' + addr.substring(addr.length-8,addr.length)

      return (
          <AddressDiv>
            <AddressDropdownButton
              onClick={ () => {
                this.toggleList()}}>
              {addr}
            </AddressDropdownButton>
            <AddressDropdownContent visible={listOpen} size={pos}>
              {menuLine}
            </AddressDropdownContent>
          </AddressDiv>
      )
    }

}


AddressDropdown.propTypes = {
  setAddressList: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setBalance:  PropTypes.func.isRequired,
  setPrivateKey:  PropTypes.func.isRequired,
  mainSubPage: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired
}


function mapStateToProps (state) {
  return {
    mainSubPage: state.mainSubPage,
    context: state.context,
    settings: state.settings,
    secrets: state.secrets,
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setAddress,
      setBalance,
      setPrivateKey,
      setAddressList
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(AddressDropdown)
