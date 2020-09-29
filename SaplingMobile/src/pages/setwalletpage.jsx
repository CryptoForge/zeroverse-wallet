import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { coins } from '../utils/coins.js'
import { encrypt, saltHashPassword, KeySalt } from '../utils/hash.js'
import { setSeedPhrase, setBirthday } from '../actions/Secrets'
import { setMinimumBlock, setWalletPassPhrase } from '../actions/Settings'
import { setQrScanning, setWalletLoaded } from '../actions/Context'

import Qr from '../containers/qr'
import RingSpinner from '../containers/spinner'
import {  WalletPage,
          WalletPageTitle,
          WalletSection,
          WalletSectionTitle,
          WalletSpinner,
          WalletKey,
          WalletKeyInvalid,
          WalletBirthdayTitle,
          WalletBirthday,
          WalletPhraseButton,
          WalletSetButton,
          WalletCancelButton,
          WalletCreateNewButton,
          WalletRecoverOldButton,} from '../components/wallet'

import { restoreWallet,
         checkSeedPhrase,
         getSeedPhrase,
         save} from '../utils/litewallet'

class SetWalletPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      openSection: 1,
      tempSeedPhrase: '',
      tempBirthday: 0,
      tempSeedPhraseInvalid: ''
    }

    this.setTempSeedPhraseInvalid = this.setTempSeedPhraseInvalid.bind(this)
    this.setTempSeedPhrase = this.setTempSeedPhrase.bind(this)
    this.setTempBirthday = this.setTempBirthday.bind(this)
    this.safeReleaseCamera = this.safeReleaseCamera.bind(this)
    this.handleQRScan = this.handleQRScan.bind(this)
    this.restoreWallet = this.restoreWallet.bind(this)
    this.setWallet = this.setWallet.bind(this)
    this.getNewPhrase = this.getNewPhrase.bind(this)
  }

  setSection (p) {
    if (p == 1) {
      this.setState({
        openSection: p,
        tempBirthday: this.props.secrets.birthday,
        tempSeedPhrase: this.props.secrets.seedPhrase
      })
    } else {
      this.setState({
        openSection: p
      })
    }
  }

  setTempSeedPhraseInvalid(b) {
    if (b) {
      this.setState({
        tempSeedPhraseInvalid: 'Seed Phrase Invalid!!!'
      })
    } else {
      this.setState({
        tempSeedPhraseInvalid: ''
      })
    }
  }
  setTempSeedPhrase (p) {
    this.setState({tempSeedPhrase: p})
    this.checkSeed(p)
  }

  setTempBirthday (p) {

    try {
      p = Math.floor(+p)
    } catch {
      p = coins[this.props.settings.currentCoin].branchHeight['sapling']
    }

    this.setState({tempBirthday: p})
  }

  handleQRScan () {
    // Prepare QR Scanner
    QRScanner.prepare(function (err, status) {
      // Oh no!
      if (err) {
        alert(JSON.stringify(err))
      }

      // If we are authorized to scan, then only do we invoke
      // the scan method
      if (status.authorized) {
        // Start scanning
        QRScanner.scan(function (err, qr) {
          // an error occurred, or the scan was canceled (error code `6`)
          if (err) {
            alert(JSON.stringify(err))
          } else {
            // The scan completed, display the contents of the QR code
            qr = JSON.parse(qr)
            this.setState({
              tempSeedPhrase: qr.seed,
              tempBirthday: qr.birthday
            })
          }

          // Set finished scanning
          this.props.setQrScanning(false)
          QRScanner.destroy()
        }.bind(this))

        // Show scanning preview
        QRScanner.show()

        // Set transparency
        this.props.setQrScanning(true)
      } else if (status.denied) {
        // const CUR_LANG = this.props.settings.language
        // alert(TRANSLATIONS[CUR_LANG].SendPage.noCameraPermissions)
        QRScanner.openSettings()
      } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
      }
    }.bind(this))
  }

  safeReleaseCamera () {
    // Destroy QR scanner if user goes back
    // while scanning
    if (this.props.context.qrScanning) {
      QRScanner.destroy()
      this.props.setQrScanning(false)
    }
  }

  async restoreWallet(s) {
    const currentCoin = this.props.settings.currentCoin
    var minHeight = coins[currentCoin].branchHeight['sapling']
    var args = [coins[currentCoin].litewallet[0]]
    args.push(coins[currentCoin].addressParams)
    var seedCheck = await checkSeedPhrase(this.state.tempSeedPhrase)
    seedCheck = JSON.parse(seedCheck)

    if (seedCheck.checkSeedPhrase == 'Ok') {
      args.push(this.state.tempSeedPhrase)
      try {

        if (this.state.tempBirthday > minHeight) {
          if (this.state.tempBirthday <= this.props.secrets.birthday) {
              args.push(this.state.tempBirthday.toString())
          } else {
              args.push(this.props.secrets.birthday.toString())
          }
        } else {
          args.push(minHeight.toString())
        }
        var seed = await restoreWallet(args)
        seed = JSON.parse(seed)
        if (seed.seed != null) {
          const keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)
          const pass = encrypt(seed.seed, keyHash)
          this.props.setWalletPassPhrase(pass)
          this.setWallet(seed, currentCoin)
          this.props.setWalletLoaded(true)
        }

      } catch (err) {
        console.log(err.description)
      }
    } else {
      this.setSection(s)
      this.setTempSeedPhraseInvalid(true)
    }
  }

  async getNewPhrase() {
    var seed
    try {
      seed = await getSeedPhrase()
    } catch (err) {
      console.log(err.description)
    }
    seed = JSON.parse(seed)
    this.setTempSeedPhrase(seed.seedPhrase)
    this.setTempBirthday(this.props.secrets.birthday)
    this.setTempSeedPhraseInvalid(false)
  }

  async checkSeed(seed) {
    var seedCheck = await checkSeedPhrase(seed)
    seedCheck = JSON.parse(seedCheck)
    if (seedCheck.checkSeedPhrase == 'Ok') {
      this.setTempSeedPhraseInvalid(false)
    } else {
      this.setTempSeedPhraseInvalid(true)
    }
  }

  async setWallet(seed, currentCoin) {
    var walletFile = await save(coins[currentCoin].networkname)
    walletFile = JSON.parse(walletFile)
    if(walletFile.saved) {
      this.props.setHasExistingWallet(true)
      this.props.setSeedPhrase(seed.seed)
      this.props.setBirthday(seed.birthday)
    }
  }

  componentDidMount () {
    this.setTempSeedPhrase(this.props.secrets.seedPhrase)
    this.setTempBirthday(this.props.secrets.birthday)
  }

  componentWillUnmount () {
    this.safeReleaseCamera()
  }

    render () {
      const mainStyle =  this.props.context.qrScanning ? {opacity: '0.0', display: 'none'} : {opacity: '1.0'}

      var buttonDisplay = 'none'
      if (this.state.tempSeedPhrase.length >= 16 && this.state.currentHeight != 0) {
        buttonDisplay = 'visible'
      }

      var walletSection
      switch (this.state.openSection) {
        case 1:
          walletSection =
            <WalletSection visible={'none'}>
              <WalletCreateNewButton
                onClick={() => this.setSection(2)}>
                Create New Wallet
              </WalletCreateNewButton>
              <WalletRecoverOldButton
                onClick={() => this.setSection(3)}>
                Recover Wallet
              </WalletRecoverOldButton>
            </WalletSection>
            break
        case 2: //Create New Wallet
          walletSection =
            <WalletSection>
              <WalletSectionTitle>
                {'Set Wallet Seed Phrase'}
              </WalletSectionTitle>

              <WalletKey value={this.state.tempSeedPhrase}/>
              <WalletKeyInvalid>
                {this.state.tempSeedPhraseInvalid}
              </WalletKeyInvalid>

              <WalletBirthdayTitle>
                {'Wallet Birthday'}
              </WalletBirthdayTitle>
              <WalletBirthday value={this.state.tempBirthday}/>

              <WalletPhraseButton
                onClick={() => this.getNewPhrase()}>
                New Phrase
              </WalletPhraseButton>

              <WalletCancelButton display={buttonDisplay}
                 onClick={() => this.setSection(1)}>
                 Cancel
              </WalletCancelButton>

              <WalletSetButton display={buttonDisplay}
                onClick={() => {
                  this.setSection(4)
                  this.restoreWallet(3)
                }}>
                Create Wallet
             </WalletSetButton>

            </WalletSection>
            break

          case 3: //Recover Wallet
          walletSection =
            <WalletSection>
              <WalletSectionTitle>
                {'Set Wallet Seed Phrase'}
              </WalletSectionTitle>

              <WalletKey
                value={this.state.tempSeedPhrase}
                onChange = { (e) => {
                  this.setTempSeedPhrase(e.target.value)
                }}
              />
              <WalletKeyInvalid>
                {this.state.tempSeedPhraseInvalid}
              </WalletKeyInvalid>

              <WalletBirthdayTitle>
                {'Wallet Birthday'}
              </WalletBirthdayTitle>
              <WalletBirthday
                value={this.state.tempBirthday}
                onChange = { (e) => {
                  this.setTempBirthday(e.target.value)
                }}
              />

              <WalletPhraseButton
                onClick={() => this.handleQRScan()}>
                Scan QR Code
              </WalletPhraseButton>

              <WalletCancelButton display={buttonDisplay}
                 onClick={() => this.setSection(1)}>
                 Cancel
              </WalletCancelButton>

              <WalletSetButton display={buttonDisplay}
                onClick={() => {
                  this.setSection(4)
                  this.restoreWallet(3)
                }}>
                Restore Wallet
              </WalletSetButton>

            </WalletSection>
            break

          case 4:
            walletSection =
            <WalletSection>
              <WalletSectionTitle>
                {'Setting Up Wallet'}
              </WalletSectionTitle>
              <WalletSpinner>
                <RingSpinner/>
              </WalletSpinner>
            </WalletSection>
            break

          default:
            walletSection = <div></div>
      }

      return (
        <div>
          <div style={mainStyle}>
            <WalletPage>
              <WalletPageTitle>
                {'Create Wallet'}
              </WalletPageTitle>
              {walletSection}
            </WalletPage>
          </div>
          <Qr/>
        </div>
      )
    }
  }


SetWalletPage.propTypes = {
  setWalletPassPhrase: PropTypes.func.isRequired,
  setWalletLoaded: PropTypes.func.isRequired,
  setQrScanning: PropTypes.func.isRequired,
  setSeedPhrase: PropTypes.func.isRequired,
  setBirthday: PropTypes.func.isRequired,
  setMinimumBlock: PropTypes.func.isRequired,
  setHasExistingWallet: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings,
    secrets: state.secrets
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setWalletPassPhrase,
      setWalletLoaded,
      setQrScanning,
      setSeedPhrase,
      setBirthday,
      setMinimumBlock,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SetWalletPage)
