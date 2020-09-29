import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setSelectCoin,
         setSaving,
         setAddress,
         setBalance,
         setPrivateKey,
         setSynced,
         setZAddresses,
         setTAddresses,
         setMenuReady,
         setRefreshAddresses,
         setWalletLoaded} from '../actions/Context'

import { setSeedPhrase, setBirthday } from '../actions/Secrets'

import {
  setCurrentCoin,
  setInsightExplorer,
  setWalletPassPhrase} from '../actions/Settings'

import { coins } from '../utils/coins.js'
import { decrypt, saltHashPassword, KeySalt } from '../utils/hash.js'

import { walletExists,
         initalizeWallet,
         newWallet,
         restoreWallet
       } from '../utils/litewallet'

import { CoinDiv,
         CoinSection,
         CoinPageTitle,
         CoinCancelButton,
         CoinSelectSection,
         CoinErrorSection,
         CoinButtonFloat,
         CoinIcon,
         CoinName,
         CoinSpinner,

      } from '../components/coin'

import RingSpinner from '../containers/spinner'

class CoinPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      spinnerMsg: 'Completing Operations...',
      errorMsg: '',
      cancelEnabled: true
    }

    this.setMsg = this.setMsg.bind(this)
    this.setError = this.setError.bind(this)
    this.setCancelEnabled = this.setCancelEnabled.bind(this)
    this.changeCoint = this.changeCoin.bind(this)
  }

    setMsg(m) {
      this.setState({
        spinnerMsg: m
      })
    }

    setError(m) {
      this.setState({
        errorMsg: m
      })
    }

    setCancelEnabled(b) {
      this.setState({
        cancelEnabled: b
      })
    }

    async changeCoin(key, reinitalize) {


      const currentCoin = this.props.settings.currentCoin
      //prevent wallet saving while switching
      this.props.setSaving(true)

      //prevent closing the screen while switching
      this.setCancelEnabled(false)

      var passPhrase

      if (this.props.settings.passPhrase == null) {
        this.setMsg('Zeroverse Master seed not set, Restart App!!!')
      } else {
        try {
          const keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)
          passPhrase = decrypt(this.props.settings.passPhrase,keyHash)
        } catch {
          passPhrase = null
        }
      }

      if (passPhrase == null) {
        this.setMsg('Zeroverse Master seed not set, Restart App!!!')
      } else {

        this.setMsg('Looking for Wallet...')
        this.setError('')
        try {
          //Check for existing wallet
          var walletFile = await walletExists(coins[key].networkname)
          walletFile = JSON.parse(walletFile)

          var seed
          var args
          var error
          var restored = false
          this.props.setSynced(false)
          if (walletFile.exists && !reinitalize) {
            this.setMsg('Opening Wallet...')
            args = [coins[key].networkname]
            args.push(coins[key].litewallet[0])
            args.push(coins[key].addressParams)
            seed = await initalizeWallet(args)
            restored = true
          } else {
            this.setMsg('Creating New Wallet...')
            args = [(coins[key].litewallet[0])]
            args.push(coins[key].addressParams)
            seed = await newWallet(args)
            seed = JSON.parse(seed)
            args = [coins[key].litewallet[0]]
            args.push(coins[key].addressParams)
            args.push(passPhrase)
            args.push(seed.birthday.toString())
            seed = await restoreWallet(args)
            restored = true
          }

          seed = JSON.parse(seed)
          if (seed.seed != null && restored == true) {
            if (passPhrase != seed.seed) {
              alert("WARNING!!!" + coins[key].networkname + " seed phrase does not match the ZeroVerse's Master seed phrase.")
            }
            this.props.setSeedPhrase(seed.seed)
            this.props.setBirthday(seed.birthday)
            const apiSelection = Math.floor(Math.random()*coins[key].explorer.length)
            this.props.setInsightExplorer(coins[key].explorer[apiSelection])
            this.props.setCurrentCoin(key)
            //Clear address list
            this.props.setAddress('')
            this.props.setBalance(0)
            this.props.setPrivateKey('')
            this.props.setZAddresses([])
            this.props.setTAddresses([])
            this.props.setRefreshAddresses(true)
            this.props.setMenuReady(false)

            this.setCancelEnabled(true)
            this.props.setWalletLoaded(true)
            this.props.setSelectCoin(false)
            this.props.setSaving(false)
          } else {
            error =
            <div>
              <div>
                {'Failed to load wallet... ' + JSON.stringify(seed)}
              </div>
              <CoinButtonFloat float = {false}
                onClick = {() => {
                    this.changeCoin(key, true)
                }}
              >
                <CoinIcon src={coins[key].icon} />
                <CoinName>
                  {'Reset Wallet?'}
                </CoinName>
              </CoinButtonFloat>
            </div>
            this.setError(error)
            if (this.props.context.walletLoaded) {
              this.setMsg('Failed, Reverting to Previous Coin...')
              args = [coins[currentCoin].networkname]
              args.push(coins[currentCoin].litewallet[0])
              args.push(coins[currentCoin].addressParams)
              seed = await initalizeWallet(args)

              //Clear address list
              this.props.setAddress('')
              this.props.setBalance(0)
              this.props.setPrivateKey('')
              this.props.setZAddresses([])
              this.props.setTAddresses([])
              this.props.setRefreshAddresses(true)
              this.props.setMenuReady(false)
            }

            this.props.setSaving(false)
            this.setCancelEnabled(true)

          }
        } catch {
          try {
            error =
            <div>
              <div>
                {'Failed to load wallet... ' + JSON.stringify(seed)}
              </div>
              <CoinButtonFloat float = {false}
                onClick = {() => {
                    this.changeCoin(key, true)
                }}
              >
                <CoinIcon src={coins[key].icon} />
                <CoinName>
                  {'Reset Wallet?'}
                </CoinName>
              </CoinButtonFloat>
            </div>
            this.setError(error)
            if (this.props.context.walletLoaded) {
              this.setMsg('Failed, Reverting to Previous Coin...')
              args = [coins[currentCoin].networkname]
              args.push(coins[currentCoin].litewallet[0])
              args.push(coins[currentCoin].addressParams)
              seed = await initalizeWallet(args)

              //Clear address list
              this.props.setAddress('')
              this.props.setBalance(0)
              this.props.setZAddresses([])
              this.props.setTAddresses([])
              this.props.setPrivateKey('')
              this.props.setMenuReady(false)
            }

            this.props.setSaving(false)
            this.setCancelEnabled(true)

          } catch {
            this.setMsg('Catastrophic Error, Restart App!!!')
            this.setError(JSON.stringify(seed))
          }
        }
      }
    }

    render () {

      var coinSelect

      var errorDetected = this.state.errorMsg == '' ? false : true

      if (this.props.context.saving) {
        coinSelect =
          <CoinSpinner>
            {this.state.spinnerMsg}
            <br/><br/><br/>
            <RingSpinner />
          </CoinSpinner>

      } else {
        coinSelect = []
        for (var key of Object.keys(coins)) {
          const network = key
          coinSelect.push(
            <CoinButtonFloat float = {true}
              onClick = {() => {
                  this.changeCoin(network, false)
              }}
            >
              <CoinIcon src={coins[network].icon} />
              <CoinName>
                {key}
              </CoinName>
            </CoinButtonFloat>
          )
        }
      }


      var cancelButton
      if (this.state.cancelEnabled && this.props.context.walletLoaded) {
        cancelButton =
        <CoinCancelButton
          onClick={() => {
            this.props.setSelectCoin(false)
          }}
          >
          Cancel
        </CoinCancelButton>
      }



      return (
        <CoinDiv>
          <CoinSection>
            <CoinPageTitle>
              {'Select Coin'}
            </CoinPageTitle>
              <CoinSelectSection withError = {errorDetected}>
                {coinSelect}
              </CoinSelectSection>
              <CoinErrorSection withError = {errorDetected}>
                <br/>
                {this.state.errorMsg}
              </CoinErrorSection>
              {cancelButton}
            </CoinSection>
        </CoinDiv>
      )
    }
  }

CoinPage.propTypes = {
  setWalletPassPhrase: PropTypes.func.isRequired,
  setWalletLoaded: PropTypes.func.isRequired,
  setZAddresses: PropTypes.func.isRequired,
  setTAddresses: PropTypes.func.isRequired,
  setMenuReady: PropTypes.func.isRequired,
  setSynced: PropTypes.func.isRequired,
  setRefreshAddresses: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setBalance:  PropTypes.func.isRequired,
  setPrivateKey:  PropTypes.func.isRequired,
  setSeedPhrase: PropTypes.func.isRequired,
  setBirthday: PropTypes.func.isRequired,
  setCurrentCoin: PropTypes.func.isRequired,
  setInsightAPI: PropTypes.func.isRequired,
  setInsightExplorer: PropTypes.func.isRequired,
  setInsightZMQ: PropTypes.func.isRequired,
  setSaving: PropTypes.func.isRequired,
  setSelectCoin: PropTypes.func.isRequired,
  secrets: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    secrets: state.secrets,
    settings: state.settings,
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setWalletPassPhrase,
      setWalletLoaded,
      setSynced,
      setZAddresses,
      setTAddresses,
      setMenuReady,
      setRefreshAddresses,
      setAddress,
      setBalance,
      setPrivateKey,
      setSeedPhrase,
      setBirthday,
      setCurrentCoin,
      setInsightExplorer,
      setSaving,
      setSelectCoin
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(CoinPage)
