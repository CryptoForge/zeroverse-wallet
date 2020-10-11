import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { QRCode } from 'react-qrcode-logo'
import { coins } from '../utils/coins.js'

import { setAddress,
         setBalance,
         setPrivateKey,
         setRefreshAddresses,
         setTAddresses,
         setZAddresses,
         setSaving } from '../actions/Context'

import {
  setMainPage,
  setReceivePage} from '../actions/MainSubPage'

import { newTAddress, newZAddress, privateKey, balance, save } from '../utils/litewallet'

import {
    ReceiveGrid,
    ReceiveSection,
    ReceiveTitle,
    ReceivePageTitle,
    ReceiveAddressSelectTitle,
    ReceiveAddressTextArea,
    ReceiveAddressSelect,
    ReceiveQR,
    ReceiveButtonSection,
    ReceiveCopyButton,
    ReceiveCancelButton,
    ReceiveNewAddressSection,
    ReceiveNewTButton,
    ReceiveNewZButton,
    } from '../components/receive'

import AddressDropdown from '../containers/addressdropdown'

class Receive extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      flash: false,
    }

    this.getAddresses = this.getAddresses.bind(this)
    this.getNewTAddress = this.getNewTAddress.bind(this)
    this.getNewZAddress = this.getNewZAddress.bind(this)
    this.beginFlash = this.beginFlash.bind(this)
    this.removeFlash = this.removeFlash.bind(this)
    }

    beginFlash () {
      this.setState({flash: true})
      this.setFlashReceiveId = setTimeout(() => this.removeFlash(),125)
    }

    removeFlash () {
      this.setState({flash: false})
    }


    async getNewTAddress() {
        var addr = await newTAddress()
        addr = JSON.parse(addr)
        this.getAddresses()
        this.props.setAddress(addr[0])
        this.props.setBalance(0)
        var pk = await privateKey(addr[0])
        pk = JSON.parse(pk)
        this.props.setPrivateKey(pk[0].private_key)

        this.props.setSaving(true)
        await save(coins[this.props.settings.currentCoin].networkname)
        this.props.setSaving(false)
    }

    async getNewZAddress() {
        var addr = await newZAddress()
        addr = JSON.parse(addr)
        this.getAddresses()
        this.props.setAddress(addr[0])
        this.props.setBalance(0)
        var pk = await privateKey(addr[0])
        pk = JSON.parse(pk)
        this.props.setPrivateKey(pk[0].private_key)

        this.props.setSaving(true)
        await save(coins[this.props.settings.currentCoin].networkname)
        this.props.setSaving(false)
    }

    async getAddresses() {
      var walletBalance = await balance()
      walletBalance = JSON.parse(walletBalance)

      var zlist = []
      for (var z = 0; z < walletBalance.z_addresses.length; z++) {
        var zaddr = {
          address: walletBalance.z_addresses[z].address,
          balance: walletBalance.z_addresses[z].verified_zbalance
        }

        zlist.push(zaddr)
      }

      this.props.setZAddresses(zlist)

      var tlist = []
      if (coins[this.props.settings.currentCoin].tEnabled) {
        for (var t = 0; t < walletBalance.t_addresses.length; t++) {
          var taddr = {
            address: walletBalance.t_addresses[t].address,
            balance: walletBalance.t_addresses[t].balance
          }
          tlist.push(taddr)
        }
      }

      this.props.setTAddresses(tlist)

    }

    componentDidMount() {
    }

    render () {

        var screenDim = this.props.context.dimensions
        var address = this.props.context.address

        var addressListDisplay
        if (this.props.mainSubPage.addressList == 'none') {
          addressListDisplay = {display: 'none'}
        } else {
          addressListDisplay = {}
        }

        var tAddressButton
        if (coins[this.props.settings.currentCoin].tEnabled) {
          tAddressButton =
          <ReceiveNewTButton
            onClick={() => {
              this.getNewTAddress()
            }}>
            New T Address
          </ReceiveNewTButton>
        } else {
          tAddressButton =
          <ReceiveNewTButton disabled = {true}>
            New T Address
          </ReceiveNewTButton>
        }

        return (
        <ReceiveGrid visible={this.props.mainSubPage.receivePage}>
          <ReceiveSection>

            <ReceivePageTitle>
              {'Receiving'}
            </ReceivePageTitle>


            <ReceiveAddressSelectTitle>
              {'Select Address'}
            </ReceiveAddressSelectTitle>
            <ReceiveAddressSelect>
              <AddressDropdown/>
            </ReceiveAddressSelect>


            <div style = {addressListDisplay}>

              <ReceiveNewAddressSection>
                {tAddressButton}
                <ReceiveNewZButton
                  onClick={() => {
                    this.getNewZAddress()
                  }}>
                  New Z Address
                </ReceiveNewZButton>
              </ReceiveNewAddressSection>

              <ReceiveTitle>
                {'Full Address'}
              </ReceiveTitle>
              <ReceiveAddressTextArea flash = {this.state.flash} value={address}/>

              <ReceiveQR>
                <QRCode value={address}
                   size = {(screenDim.height * 0.45) - 20}
                   logoImage = {coins[this.props.settings.currentCoin].qrlogo}
                   ecLevel = "H"
                      />
              </ReceiveQR>

              <ReceiveButtonSection>
                <ReceiveCopyButton
                  onClick={() => {
                    this.beginFlash()
                    cordova.plugins.clipboard.copy(address)
                  }}>
                  Copy Address
                </ReceiveCopyButton>
                <ReceiveCancelButton
                  onClick={() => {
                    this.props.setMainPage('visible')
                    this.props.setReceivePage('none')
                  }}>
                  Close
                </ReceiveCancelButton>
              </ReceiveButtonSection>
            </div>
          </ReceiveSection>
        </ReceiveGrid>

        )
  }

}

Receive.propTypes = {
  setSaving: PropTypes.func.isRequired,
  setRefreshAddresses: PropTypes.func.isRequired,
  setTAddresses: PropTypes.func.isRequired,
  setZAddresses: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setBalance:  PropTypes.func.isRequired,
  setPrivateKey:  PropTypes.func.isRequired,
  setReceivePage: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    settings: state.settings,
    context: state.context,
    mainSubPage: state.mainSubPage
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setSaving,
      setRefreshAddresses,
      setTAddresses,
      setZAddresses,
      setAddress,
      setBalance,
      setPrivateKey,
      setReceivePage,
      setMainPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Receive)
