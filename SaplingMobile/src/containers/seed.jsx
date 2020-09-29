import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { QRCode } from 'react-qrcode-logo'
import { coins } from '../utils/coins.js'

import {
  setMainPage,
  setSeedPage,} from '../actions/MainSubPage'

import {
    SeedDiv,
    SeedSection,
    SeedPageTitle,
    SeedSectionTitle,
    SeedPin,
    SeedPinCancelButton,

    SeedPhraseTextArea,
    SeedBirthdayTitle,
    SeedBirthdayTextArea,

    SeedQR,
    SeedButtonSection,
    SeedCopyButton,
    SeedCancelButton,
    PinSection,
    KeySection,
  } from '../components/seed'


import { seed } from '../utils/litewallet'

class Seed extends React.Component {

  constructor (props) {
    super(props)

      this.state = {
        pin: 'visible',
        key: 'none',
        password: '',
        seed: '',
        flash: false,
      }

      //State Updates
      this.setPassword = this.setPassword.bind(this)
      this.beginFlash = this.beginFlash.bind(this)
      this.removeFlash = this.removeFlash.bind(this)
    }

    beginFlash () {
      this.setState({flash: true})
      this.setFlashReceiveId = setInterval(() => this.removeFlash(),125)
    }

    removeFlash () {
      this.setState({flash: false})
      clearInterval(this.setFlashReceiveId)
    }

    async setPassword (p) {
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
          try {
            var walletSeed  = await seed()
            walletSeed = JSON.parse(walletSeed)
            this.setState({
              seed: walletSeed
            })
            console.log(this.state.seed)
          } catch (e) {
            console.log(e.description)
          }

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
        const screenDim = this.props.context.dimensions
        const walletSeed = this.state.seed

        return (
        <SeedDiv visible={this.props.mainSubPage.seedPage}>
          <SeedPageTitle>
            {'Wallet Seed'}
          </SeedPageTitle>

          <PinSection visible={this.state.pin}>
            <SeedSection>
              <SeedSectionTitle>
                {'Enter 8-Digit Pin to Unlock seed'}
              </SeedSectionTitle>

              <SeedPin
                type="password"
                value={this.state.password}
                onChange={e => this.setPassword(e.target.value)} />

              <SeedPinCancelButton
                onClick={() => {
                  this.props.setMainPage('visible')
                  this.setState({pin: 'visible',key: 'none',password: '',seed: ''})
                  this.props.setSeedPage('none')
                }}>
                Close
              </SeedPinCancelButton>
            </SeedSection>
          </PinSection>

          <KeySection visible={this.state.key}>
            <SeedSection>


              <SeedSectionTitle>
                {'Wallet Seed Phrase'}
              </SeedSectionTitle>
              <SeedPhraseTextArea flash = {this.state.flash} value={walletSeed.seed}/>


              <SeedBirthdayTitle>
                {'Birthday'}
              </SeedBirthdayTitle>
              <SeedBirthdayTextArea value={walletSeed.birthday}/>

              <SeedQR>
                <QRCode value={JSON.stringify(walletSeed)}
                   size = {(screenDim.height * 0.45) - 20}
                   logoImage = {coins[this.props.settings.currentCoin].qrlogo}
                   ecLevel = "H"
                      />
              </SeedQR>


              <SeedButtonSection>
                <SeedCopyButton
                  onClick={() => {
                    this.beginFlash()
                    cordova.plugins.clipboard.copy(walletSeed.seed)
                  }}>
                  Copy Phrase
                </SeedCopyButton>
                <SeedCancelButton
                  onClick={() => {
                    this.props.setMainPage('visible')
                    this.setState({pin: 'visible',key: 'none',password: '',seed: ''})
                    this.props.setSeedPage('none')
                  }}>
                  Close
                </SeedCancelButton>
              </SeedButtonSection>
            </SeedSection>
          </KeySection>
        </SeedDiv>

        )
  }

}

Seed.propTypes = {
  setSeedPage: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings,
    secrets: state.secrets,
    mainSubPage: state.mainSubPage
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setSeedPage,
      setMainPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Seed)
