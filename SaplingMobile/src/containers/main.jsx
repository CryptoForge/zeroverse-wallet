import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import axios from 'axios'
import { coins } from '../utils/coins.js'

import {
  setSynced,
  setZerInBtcValue,
  setZerInCurrencyValue,
  setSelectCoin,
  setReindexWallet,
  setSaving } from '../actions/Context'

import {
  setMainPage,
  setSendPage,
  setReceivePage,
  setPrivateKeyPage,
  setSeedPage} from '../actions/MainSubPage'

import {clear, sync, syncStatus} from '../utils/litewallet'

import { MainGrid,
         UpperButtonSection,
         UpperSection,
         UpperSectionOpaque,
         LowerSection,
         MainSendButton,
         MainReceiveButton,
         Menu,
         MenuTitle,
         MenuButton,
         MenuButtonImg,
         MenuContent,
         MenuButtonLine} from '../components/main'


import ChainOps from '../containers/chainops'
import TransactionList from '../containers/transactionlist'

import menuIcon from '../assets/menu.svg'

class Main extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      menuOpen: 'none'
    }

    this.getZerPrice = this.getZerPrice.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.rescanWallet = this.rescanWallet.bind(this)
  }

    closeMenu () {
      this.setState({menuOpen: 'none'})
    }

    toggleMenu () {
      if (this.state.menuOpen == 'none') {
        this.setState({menuOpen: 'block'})
      } else {
        this.setState({menuOpen: 'none'})
      }
    }

    getZerPrice() {
      if (this.props.mainSubPage.mainPage != 'none') {

        const coinId = coins[this.props.settings.currentCoin].coinGeckoId
        const cmcUSDInfoURL = 'https://api.coingecko.com/api/v3/simple/price?ids=' + coinId + '&vs_currencies=usd'
        axios.get(cmcUSDInfoURL)
          .then((resp) => {
            try {
              const priceCurrency = parseFloat(resp.data[coinId].usd)
              this.props.setZerInCurrencyValue(priceCurrency)
            } catch (err) {
              if (process.env.NODE_ENV != 'production') {
                console.log(err)
              }
            }
        })

        const cmcBTCInfoURL = 'https://api.coingecko.com/api/v3/simple/price?ids=' + coinId + '&vs_currencies=btc'
        axios.get(cmcBTCInfoURL)
          .then((resp) => {
            try {
              const priceBtc = parseFloat(resp.data[coinId].btc)
              this.props.setZerInBtcValue(priceBtc)
            } catch (err) {
              if (process.env.NODE_ENV != 'production') {
                console.log(err)
              }
            }
        })

        // const cmcZerInfoURL = 'https://zersapling1.zeromachine.io/insight-api-zero/currency'
        // axios.get(cmcZerInfoURL)
        //   .then((resp) => {
        //     try {
        //       const priceBtc = parseFloat(resp.data.data.btc)
        //       const priceCurrency = parseFloat(resp.data.data.usd)
        //       this.props.setZerInBtcValue(priceBtc)
        //       this.props.setZerInCurrencyValue(priceCurrency)
        //     } catch (err) {
        //       if (process.env.NODE_ENV != 'production') {
        //         console.log(err)
        //       }
        //     }
        // })
      }
    }

    async rescanWallet() {
      clearInterval(this.RescanID)
      try {
        var status = await syncStatus()
        status = JSON.parse(status)
        if (this.props.context.walletInUse) {
          this.RescanID = setInterval(
            () => this.rescanWallet(),
            10
          )
        } else if (status.syncing == "true") {
          this.props.setSynced(false)
        } else {
          this.props.setSaving(true)
          await clear()
          this.props.setSynced(false)
          sync()
          this.props.setSaving(false)
        }
      } catch {
        alert('Wallet Error!!! Unable to rescan, try again.')
      }

    }

    componentDidMount() {
      this.getZerPrice()
      this.PriceID = setInterval(
        () => this.getZerPrice(),
        30000
      )

      window.addEventListener("click", this.closeMenu)

    }

    componentWillUnmount() {
      clearInterval(this.PriceID)
      clearInterval(this.RescanID)
    }


    render () {

      var rescanButton
      var size
      var displaySendButton
      if (this.props.context.synced == true) {
        displaySendButton =
            <MainSendButton
              onClick={() => {
                this.props.setMainPage('none')
                this.props.setSendPage('visible')
              }}>
              Send
            </MainSendButton>

        size = 5
        rescanButton =
            <MenuButtonLine pos={size - 1}
            onClick={() => {
              this.rescanWallet()
              this.props.setSynced(false)
            }}
            >
            Rescan
            </MenuButtonLine>

      } else {
        displaySendButton = <MainSendButton disabled = {true}>
          Send
        </MainSendButton>
        size = 4
      }

      var coinMenu = []

      if (this.props.context.menuReady) {
        coinMenu.push(<MenuButtonLine pos={1}
        onClick={() => {
          this.props.setMainPage('none')
          this.props.setPrivateKeyPage('visible')
        }}
        >
        Private Key(s)
        </MenuButtonLine>)

        coinMenu.push(<MenuButtonLine pos={2}
        onClick={() => {
          this.props.setMainPage('none')
          this.props.setSeedPage('visible')
        }}
        >
        Wallet Seed
        </MenuButtonLine>)

        coinMenu.push(<MenuButtonLine pos={3}
        onClick={() => {
          this.props.setReindexWallet(true)
        }}
        >
        Reindex Wallet
        </MenuButtonLine>)
      } else {
        rescanButton = null
        displaySendButton = <MainSendButton disabled = {true}>
          Send
        </MainSendButton>
        size = 1
      }



      return (
        <MainGrid visible={this.props.mainSubPage.mainPage}>

          <Menu>
            <MenuTitle>
              ZeroVerse Wallet
            </MenuTitle>
            <MenuButton
              onClick={ e => {
                e.stopPropagation()
                this.toggleMenu()}}>
              <MenuButtonImg src={menuIcon}/>
            </MenuButton>
            <MenuContent visible={this.state.menuOpen} size={size}>

              <MenuButtonLine pos={0}
              onClick={() => {
                this.props.setSelectCoin(true)
              }}
              >
              Select Coin
              </MenuButtonLine>
              {coinMenu}
              {rescanButton}
            </MenuContent>
          </Menu>


          <UpperSection>
          </UpperSection>
          <UpperSectionOpaque>
            <ChainOps/>
            <UpperButtonSection>
              {displaySendButton}
              <MainReceiveButton
                onClick={() => {
                  this.props.setMainPage('none')
                  this.props.setReceivePage('visible')
                }}>
                Receive
              </MainReceiveButton>
            </UpperButtonSection>
          </UpperSectionOpaque>


          <LowerSection>
            <TransactionList/>
          </LowerSection>

        </MainGrid>
      )
    }

  }


Main.propTypes = {
  setSaving: PropTypes.func.isRequired,
  setSynced: PropTypes.func.isRequired,
  setZerInBtcValue: PropTypes.func.isRequired,
  setZerInCurrencyValue: PropTypes.func.isRequired,
  setSelectCoin: PropTypes.func.isRequired,
  setReindexWallet: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  setSendPage: PropTypes.func.isRequired,
  setReceivePage: PropTypes.func.isRequired,
  setPrivateKeyPage: PropTypes.func.isRequired,
  setSeedPage: PropTypes.func.isRequired,
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
      setSynced,
      setZerInBtcValue,
      setZerInCurrencyValue,
      setSelectCoin,
      setReindexWallet,
      setMainPage,
      setSendPage,
      setReceivePage,
      setPrivateKeyPage,
      setSeedPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Main)
