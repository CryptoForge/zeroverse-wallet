import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setReindexWallet,
         setSynced,
         setSaving,
         setAddress,
         setBalance,
         setPrivateKey,
         setRefreshAddresses } from '../actions/Context'

import { setSeedPhrase, setBirthday } from '../actions/Secrets'

import { coins } from '../utils/coins.js'

import {
    ReindexDiv,
    ReindexSection,
    ReindexPageTitle,
    ReindexSectionTitle,
    ReindexPin,
    ReindexPinCancelButton,
    ReindexString,
    ReindexButtonSection,
    ReindexOKButton,
    ReindexCancelButton,
    PinSection,
    KeySection,
    CoinSpinner
} from '../components/reindex'

import RingSpinner from '../containers/spinner'

import { initalizeWallet,
         restoreWallet} from '../utils/litewallet'

class ReindexPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      pin: 'visible',
      key: 'none',
      password: '',
      birthday: this.props.secrets.birthday,
      spinnerMsg: 'Completing Operations...',
      okEnabled: false,
      cancelEnabled: true,
    }

    this.setMsg = this.setMsg.bind(this)
    this.setCancelEnabled = this.setCancelEnabled.bind(this)
    this.setTempBirthday = this.setTempBirthday.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.reInitalize = this.reInitalize.bind(this)
  }

  setMsg(m) {
    this.setState({
      spinnerMsg: m
    })
  }

  setCancelEnabled(b) {
    this.setState({
      cancelEnabled: b
    })
  }

  setTempBirthday (p) {

    try {
      p = Math.floor(+p)
    } catch {
      p = coins[this.props.settings.currentCoin].branchHeight['sapling']
    }

    this.setState({birthday: p})

    if (this.state.birthday != this.props.secrets.birthday) {
      this.setState({okEnabled: true})
    }
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

    async reInitalize () {
      this.props.setSaving(true)
      this.props.setSynced(false)
      this.setMsg('Re-Initalizing Wallet...')
      const key = this.props.settings.currentCoin
      var seed
      var args
      try {
        args = [coins[key].litewallet[0]]
        args.push(coins[key].addressParams)
        args.push(this.props.secrets.seedPhrase)
        args.push(this.state.birthday.toString())
        seed = await restoreWallet(args)

        seed = JSON.parse(seed)
        if (seed.seed != null) {
          this.props.setSeedPhrase(seed.seed)
          this.props.setBirthday(seed.birthday)

          //Clear address list
          this.props.setAddress('')
          this.props.setBalance(0)
          this.props.setPrivateKey('')
          this.props.setRefreshAddresses(true)

          this.props.setSaving(false)
          this.setCancelEnabled(true)
          this.props.setReindexWallet(false)
        } else {
          this.setMsg('Failed, Reverting to Previous State...')
          args = [coins[key].networkname]
          args.push(coins[key].litewallet[0])
          args.push(coins[key].addressParams)
          seed = await initalizeWallet(args)
          seed = JSON.parse(seed)
          if (seed.seed != null) {
            this.props.setSeedPhrase(seed.seed)
            this.props.setBirthday(seed.birthday)

            //Clear address list
            this.props.setAddress('')
            this.props.setBalance(0)
            this.props.setPrivateKey('')
            this.props.setRefreshAddresses(true)

            this.props.setSaving(false)
            this.setCancelEnabled(true)
          } else {
            this.setMsg('Catastrophic Error, Restart App!!!')
          }

        }

      } catch {
        this.setMsg('Catastrophic Error, Restart App!!!')
      }


    }

    render () {




      var okButton
      if (this.state.okEnabled) {
        okButton =
        <ReindexOKButton
          onClick={() => {
          this.reInitalize()
          }}>
          Ok
        </ReindexOKButton>
      }

      var cancelButton
      if (this.state.cancelEnabled) {
        cancelButton =
        <ReindexCancelButton
          onClick={() => {
            this.props.setReindexWallet(false)
          }}>
          Close
        </ReindexCancelButton>
      }




      var coinSelect
      var coinBody

      if (this.props.context.saving) {
        coinSelect =
          <CoinSpinner>
            {this.state.spinnerMsg}
            <br/><br/><br/>
            <RingSpinner />
          </CoinSpinner>

          coinBody =
          <ReindexSection>
            {coinSelect}
            <ReindexButtonSection>
            </ReindexButtonSection>
          </ReindexSection>

      } else {
        coinSelect = []

        coinSelect.push(
        <ReindexSectionTitle>
          {'Set Wallet Height'}
        </ReindexSectionTitle>)

        coinSelect.push(
        <ReindexPin
          value={this.state.birthday}
          onChange = {(e) => {
          this.setTempBirthday(e.target.value)}} />)

        coinSelect.push(
        <ReindexString>
          {'WARNING'}
          <br/><br/>
          {'This function will re-initialize'}<br/>{'your wallet with a new birthday.'}
          <br/><br/>
          {'All addresses will be removed'}<br/>{'except the primary address.'}
          <br/><br/>
          {'Addresses can be re-added on'}<br/>{'the receive page, rescan aftwards.'}
        </ReindexString>)

        coinBody =
        <ReindexSection>
          {coinSelect}
          <ReindexButtonSection>
            {okButton}
            {cancelButton}
          </ReindexButtonSection>
        </ReindexSection>
      }






      return (
        <ReindexDiv visible={this.props.mainSubPage.ReindexPage}>
          <ReindexPageTitle>
            {'Reindex Wallet'}
          </ReindexPageTitle>

          <PinSection visible={this.state.pin}>
            <ReindexSection>
              <ReindexSectionTitle>
                {'Enter 8-Digit Pin to Unlock seed'}
              </ReindexSectionTitle>
              <ReindexPin
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setPassword(e.target.value)} />

              <ReindexPinCancelButton
                onClick={() => {
                  this.props.setReindexWallet(false)
                }}>
                Close
              </ReindexPinCancelButton>
            </ReindexSection>
          </PinSection>

          <KeySection visible={this.state.key}>
            {coinBody}
          </KeySection>
        </ReindexDiv>
      )
    }

  }


ReindexPage.propTypes = {
  setSynced: PropTypes.func.isRequired,
  setRefreshAddresses: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setBalance:  PropTypes.func.isRequired,
  setPrivateKey:  PropTypes.func.isRequired,
  setSeedPhrase: PropTypes.func.isRequired,
  setSaving: PropTypes.func.isRequired,
  setBirthday: PropTypes.func.isRequired,
  setReindexWallet: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    settings: state.settings,
    context: state.context,
    secrets: state.secrets,
    mainSubPage: state.mainSubPage
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setSynced,
      setRefreshAddresses,
      setAddress,
      setBalance,
      setPrivateKey,
      setSeedPhrase,
      setSaving,
      setBirthday,
      setReindexWallet,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ReindexPage)
