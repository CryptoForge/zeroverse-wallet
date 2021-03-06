import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setAddress,
         setBalance,
         setPrivateKey,
         setSynced,
         setSaving,
         setZAddresses,
         setTAddresses,
         setMenuReady,
         setRefreshAddresses,
         setWalletInUse } from '../actions/Context'

import { ChainSyncGrid,
         AddressDiv,
         SyncDiv,
         ImgDiv,
         LogoImg,
         BalanceDiv,
         BalanceNumberDiv,
         CurrencyDiv} from '../components/chainops'

import { coins } from '../utils/coins.js'

import {
  balance,
  sync,
  syncStatus,
  info,
  save,
  privateKey } from '../utils/litewallet'

class ChainOps extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      walletBalance: 0.00000000,
      walletHeight: 0,
      chainHeight: 1,
      syncing: true,
      walletError: false,
      errorMsg: '',
      syncWalletTimer: null,
      syncStatus: null,
      saveWalletCounter: 0
    }

    this.getWalletStatus = this.getWalletStatus.bind(this)
    this.updateWallet = this.updateWallet.bind(this)
  }

    async getWalletStatus() {
      this.props.setWalletInUse(true)
      if (!this.props.context.saving) {
        var walletStatus = await syncStatus()
        walletStatus = JSON.parse(walletStatus)

        if (walletStatus.syncing != "true") {

          if (!this.state.syncing && !this.props.context.synced && this.props.context.menuReady) {
            this.props.setSynced(true)
          }

          this.setState({
            syncing: false
          })
        } else {
          if (walletStatus.total_blocks > walletStatus.synced_blocks + 10) {
            this.props.setSynced(false)
            this.setState({
              syncing: true
            })
          }
        }
      }

      var mainPageOpen = true
      if (this.props.context.selectCoin || !this.props.context.walletLoaded || this.props.context.reindexWallet) {
        mainPageOpen = false
      }

      clearTimeout(this.state.syncWalletTimer)
      if (this.props.context.synced) {
        if (mainPageOpen) {
          const syncWalletTimerIDLong = setTimeout(
            () => {
              this.getWalletStatus()
            },15000)
          this.setState({syncWalletTimer: syncWalletTimerIDLong})
        }
      } else {
        if (mainPageOpen) {
          const syncWalletTimerIDShort = setTimeout(
            () => {
              this.getWalletStatus()
            },1000)
          this.setState({syncWalletTimer: syncWalletTimerIDShort})
        }
      }
      this.props.setWalletInUse(false)
    }

    async updateWallet() {
      if (!this.props.context.saving) {
        this.props.setWalletInUse(true)

        sync()

        if (this.state.saveWalletCounter > 30) {
          this.props.setSaving(true)
          await save(coins[this.props.settings.currentCoin].networkname)
          this.setState({saveWalletCounter: 0})
          this.props.setSaving(false)
        }

        var walletInfo = await info()
        try {
          walletInfo = JSON.parse(walletInfo)
          this.setState({
            walletError: false,
            errorMsg: ''
          })
        } catch {
          this.setState({
            walletError: true,
            errorMsg: walletInfo
          })
        }

        var walletBalance = await balance()

        try {
          walletBalance = JSON.parse(walletBalance)
        } catch {
          this.setState({
            walletError: true,
            errorMsg: walletBalance
          })
        }

        var walletStatus = await syncStatus()

        try {
          walletStatus = JSON.parse(walletStatus)
        } catch {
          this.setState({
            walletError: true,
            errorMsg: walletStatus
          })
        }

        if (walletStatus.syncing == "true") {
          this.setState({
            walletBalance: (walletBalance.verified_zbalance + walletBalance.tbalance).toFixed(8).toString(),
            walletHeight: walletStatus.synced_blocks,
            chainHeight: walletStatus.total_blocks,
          })

        } else {
          this.setState({
            walletBalance: (walletBalance.verified_zbalance + walletBalance.tbalance).toFixed(8).toString(),
            walletHeight: walletInfo.latest_block_height,
            chainHeight: walletInfo.latest_block_height,
          })
        }




        var bestAddress = ''
        var bestAmount = 0

        var zlist = []
        for (var z = 0; z < walletBalance.z_addresses.length; z++) {
          var zaddr = {
            address: walletBalance.z_addresses[z].address,
            balance: walletBalance.z_addresses[z].verified_zbalance
          }

          if (bestAmount == 0 && z == 0) {
            bestAddress =  zaddr.address
            bestAmount = zaddr.balance
          }

          if (zaddr.balance > bestAmount) {
            bestAddress =  zaddr.address
            bestAmount = zaddr.balance
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
            if (taddr.balance > bestAmount) {
              bestAddress =  taddr.address
              bestAmount = taddr.balance
            }
            tlist.push(taddr)
          }
        }

        this.props.setTAddresses(tlist)

        if (this.props.context.address == '') {
          this.props.setAddress(bestAddress)
          this.props.setBalance(bestAmount)
          var pk = await privateKey(bestAddress)
          pk = JSON.parse(pk)
          this.props.setPrivateKey(pk[0].private_key)
        }

        if (!this.props.context.menuReady) {
          this.props.setMenuReady(true)
        }

        this.props.setWalletInUse(false)
      }

      var mainPageOpen = true
      if (this.props.context.selectCoin) {
        mainPageOpen = false
      } else if (!this.props.context.walletLoaded) {
        mainPageOpen = false
      } else if ( this.props.context.reindexWallet) {
        mainPageOpen = false
      }

      clearTimeout(this.state.updateTimer)
      if (this.props.context.synced) {
        if (mainPageOpen) {
          const updateTimerIDLong = setTimeout(
            () => {
              const walletCount = this.state.saveWalletCounter + 15
              this.setState({saveWalletCounter: walletCount})
              this.updateWallet()
            },
            15000
          )
          this.setState({updateTimer: updateTimerIDLong})
        }
      } else {
        if (mainPageOpen) {
          const updateTimerIDShort = setTimeout(
            () => {
              const walletCount = this.state.saveWalletCounter + 3
              this.setState({saveWalletCounter: walletCount})
              this.updateWallet()
            },
            3000
          )
          this.setState({updateTimer: updateTimerIDShort})
        }
      }
    }




    componentDidMount() {

      sync()

      this.getWalletStatus()
      this.updateWallet()
    }

    componentWillUnmount() {
      clearTimeout(this.state.updateTimer)
      clearTimeout(this.state.syncWalletTimer)
    }


    render () {

      var balanceSection
      var syncSection

      if (this.state.walletError) {

        balanceSection =
        <BalanceDiv>
          {'Wallet Error'}
          <br/>
          <BalanceNumberDiv>
            <br/>
          </BalanceNumberDiv>
          <CurrencyDiv>
            {this.state.errorMsg}
          </CurrencyDiv>
        </BalanceDiv>

        syncSection =
        <SyncDiv>
        </SyncDiv>

      } else {

        balanceSection =
        <BalanceDiv>
          {coins[this.props.settings.currentCoin].networkname + ' Balance'}
          <br/>
          <BalanceNumberDiv>
            {(this.state.walletBalance / 1e08).toFixed(8).toString()}
          </BalanceNumberDiv>
          <CurrencyDiv>
            {((this.state.walletBalance / 1e08) * this.props.context.BTCValue).toFixed(8) + ' BTC'}
            <br/>
            {((this.state.walletBalance / 1e08)  * this.props.context.currencyValue).toFixed(6) + ' USD'}
          </CurrencyDiv>
        </BalanceDiv>

        syncSection =
        <SyncDiv>
          {'Synced Block'}
          <br/>
          {this.state.walletHeight}
        </SyncDiv>
      }

      if (this.props.context.refreshAddresses) {
        this.updateWallet()
        this.getWalletStatus()
        this.props.setRefreshAddresses(false)
      }

      return (
        <ChainSyncGrid>
            <AddressDiv>
              {'Coin: ' + this.props.settings.currentCoin}
            </AddressDiv>

            {balanceSection}
            {syncSection}

            <ImgDiv>
              <LogoImg src={coins[this.props.settings.currentCoin].icon} />
            </ImgDiv>
        </ChainSyncGrid>
      )
    }
}


ChainOps.propTypes = {
  setWalletInUse: PropTypes.func.isRequired,
  setRefreshAddresses: PropTypes.func.isRequired,
  setTAddresses: PropTypes.func.isRequired,
  setZAddresses: PropTypes.func.isRequired,
  setMenuReady: PropTypes.func.isRequired,
  setSynced: PropTypes.func.isRequired,
  setSaving: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setBalance:  PropTypes.func.isRequired,
  setPrivateKey:  PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired
}


function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings,
    secrets: state.secrets,
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setWalletInUse,
      setRefreshAddresses,
      setTAddresses,
      setZAddresses,
      setMenuReady,
      setAddress,
      setBalance,
      setPrivateKey,
      setSynced,
      setSaving
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChainOps)
