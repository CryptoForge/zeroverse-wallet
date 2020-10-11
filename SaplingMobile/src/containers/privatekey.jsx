import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { QRCode } from 'react-qrcode-logo'
import { coins } from '../utils/coins.js'

import {
  setMainPage,
  setPrivateKeyPage,} from '../actions/MainSubPage'

import {
    PrivateKeyDiv,
    PrivateKeySection,
    PrivateKeyPageTitle,
    PrivateKeySectionTitle,
    PrivateKeyPin,
    PrivateKeyPinCancelButton,

    PrivateKeyAddress,
    PrivateKeyTitle,
    PrivateKeyString,

    PrivateKeyQR,
    PrivateKeyButtonSection,
    PrivateKeyCopyButton,
    PrivateKeyCancelButton,
    PinSection,
    KeySection,
} from '../components/privatekey'

import AddressDropdown from '../containers/addressdropdown'

class PrivateKey extends React.Component {

  constructor (props) {
    super(props)

      this.state = {
        pin: 'visible',
        key: 'none',
        password: '',
        flash: false,
      }

      //State Updates
      this.setPassword = this.setPassword.bind(this)
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

    setPassword (p) {
      if (p.length >= 8) {
        p = p.substring(0,8)
      }

      if (p.length == 8) {
        if (p == this.props.context.activePassword) {
          this.setState({
            pin: 'none',
            key: 'visible',
            password: ''
          })
        } else {
          this.setState({
            pin: 'visible',
            key: 'none',
            password: ''
          })
        }
      } else {
        this.setState({
          password: p
        })
      }
    }



    componentDidMount() {
    }


    render () {
        var screenDim = this.props.context.dimensions
        var key = this.props.context.privateKey

        var addressListDisplay
        if (this.props.mainSubPage.addressList == 'none') {
          addressListDisplay = {display: 'none'}
        } else {
          addressListDisplay = {}
        }

        return (
        <PrivateKeyDiv visible={this.props.mainSubPage.privateKeyPage}>
          <PrivateKeyPageTitle>
            {'Private Keys'}
          </PrivateKeyPageTitle>

          <PinSection visible={this.state.pin}>
            <PrivateKeySection>
              <PrivateKeySectionTitle>
                {'Enter 8-Digit Pin to Unlock seed'}
              </PrivateKeySectionTitle>
              <PrivateKeyPin
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setPassword(e.target.value)} />

              <PrivateKeyPinCancelButton
                onClick={() => {
                  this.props.setMainPage('visible')
                  this.setState({pin: 'visible',key: 'none',password: ''})
                  this.props.setPrivateKeyPage('none')
                }}>
                Close
              </PrivateKeyPinCancelButton>
            </PrivateKeySection>
          </PinSection>

          <KeySection visible={this.state.key}>
            <PrivateKeySection>

              <PrivateKeySectionTitle>
                {'Select Address'}
              </PrivateKeySectionTitle>
              <PrivateKeyAddress>
                <div>
                  <AddressDropdown/>
                </div>
              </PrivateKeyAddress>

              <div style = {addressListDisplay}>
                <PrivateKeyTitle>
                  {'Private Key'}
                </PrivateKeyTitle>
                <PrivateKeyString flash = {this.state.flash}>
                  {key}
                </PrivateKeyString>




                <PrivateKeyQR>
                  <QRCode value={key}
                     size = {(screenDim.height * 0.45) - 20}
                     logoImage = {coins[this.props.settings.currentCoin].qrlogo}
                     ecLevel = "H"
                        />
                </PrivateKeyQR>




                <PrivateKeyButtonSection>
                  <PrivateKeyCopyButton
                    onClick={() => {
                      this.beginFlash()
                      cordova.plugins.clipboard.copy(key)
                    }}>
                    Copy Key
                  </PrivateKeyCopyButton>


                  <PrivateKeyCancelButton
                    onClick={() => {
                      this.props.setMainPage('visible')
                      this.setState({pin: 'visible',key: 'none',password: ''})
                      this.props.setPrivateKeyPage('none')
                    }}>
                    Close
                  </PrivateKeyCancelButton>
                </PrivateKeyButtonSection>
              </div>

            </PrivateKeySection>
          </KeySection>
        </PrivateKeyDiv>

        )
  }

}

PrivateKey.propTypes = {
  setPrivateKeyPage: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings,
    mainSubPage: state.mainSubPage
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setPrivateKeyPage,
      setMainPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(PrivateKey)
