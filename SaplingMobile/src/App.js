import React from 'react';
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { ThemeProvider } from 'styled-components';

import { setDimensions, setSelectCoin, setReindexWallet, setWalletLoaded, setFirebase } from './actions/Context'

import { setSeedPhrase, setBirthday } from './actions/Secrets'
import {
  setCurrentCoin,
  setLanguage,
  setCurrency,
  setWalletPassword,
  setWalletPassPhrase,
  setInsightExplorer,
  setMinimumBlock,
  setDisplayDimensions,
  setSaveData,
  setNoteInputs,
  setProcessTime} from './actions/Settings'

import {
  setMainPage,
  setSendPage,
  setReceivePage,
  setPrivateKeyPage,
  setSeedPage} from './actions/MainSubPage'

import { coins } from './utils/coins.js'
import { getTheme } from './utils/theme.js'

import { crashlyticsEnabled } from './utils/firebase.js'
// import {
//   getLocalFileSystemURL,
//   writeDataToFile
// } from './utils/fileops'

import { ZERO_MOBILE_SAVE_PATH, readFromFile, getLocalFileSystemURL, getFileEntry, writeDataToFile } from './utils/persistentStorage'
//import ZERO_LOGO from './assets/zero-logo-white.png'

import {
  LoginGrid,
  LoginForm,
  LoginFormOpaque,
  LoginHeading,
  LoginHeadingImg,
  //LoginPassword,
  //LoginInput,
  LoginSocialContainer,
  LoginSocial} from './components/login'

import zerologo from './assets/logo-white.png'
import github from './assets/github-white.png'
import twitter from './assets/twitter-white.png'
import telegram from './assets/telegram-white.png'
import discord from './assets/discord-white.png'
import heading from './assets/zero-logo-white.png'

import LoginPage from './pages/loginpage'
import MainPage from './pages/mainpage'
import CoinPage from './pages/coinpage'
import ReindexPage from './pages/reindexpage'
import SetPasswordPage from './pages/setpasswordpage'
import SetWalletPage from './pages/setwalletpage'
import RingSpinner from './containers/spinner'

import { walletExists,
         initalizeWallet,
         newWallet,
         checkSeedPhrase } from './utils/litewallet'

import {encrypt, decrypt, saltHashPassword, KeySalt} from './utils/hash.js'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tempPin: '',
      Initalized: true,
      hasExistingWallet: false,
      hasExistingPin: false,
      hasInputPin: false,
      readSavedFile: false,
      parseError: false,
      stringData: '',
      data: null
    }

    this.savingFile = false
    this.initalize = this.initalize.bind(this)
    this.runInitalize = this.runInitalize.bind(this)
    this.setScreenSize = this.setScreenSize.bind(this)
    this.setRotate = this.setRotate.bind(this)
    this.backButtonHandler = this.backButtonHandler.bind(this)
    this.saveData = this.saveData.bind(this)
    this.enableFirebase = this.enableFirebase.bind(this)
  }

  setScreenSize() {

    if (this.props.context.dimensions.height != window.outerHeight && this.props.context.dimensions.width != window.outerWidth) {
      this.props.setDimensions({"height" : window.outerHeight, "width" : window.outerWidth})
      this.props.setDisplayDimensions({"height" : window.outerHeight, "width" : window.outerWidth})
    }
    screen.orientation.lock('portrait');

  }

  setRotate() {
    if (screen.height > screen.width && this.props.context.dimensions.height < this.props.context.dimensions.width ||
        screen.height < screen.width && this.props.context.dimensions.height > this.props.context.dimensions.width ) {
        this.props.setDimensions({"height" : this.props.context.dimensions.width, "width" : this.props.context.dimensions.height})
        this.props.setDisplayDimensions({"height" : this.props.context.dimensions.width, "width" : this.props.context.dimensions.height})
    }
  }

  runInitalize() {
    if (this.props.context.activePassword == '') {
      clearTimeout(this.InitId)
      this.InitId = setTimeout(
        () => this.runInitalize(),
        10
      )
    } else {
      this.initalize()
    }
  }

  async initalize() {

    const keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)

    const data = this.state.data
    //check for valid saved phrase
    if (data != null) {
      if (data.settings.passPhrase !== undefined && data.settings.passPhrase != null) {
        var phrase = decrypt(data.settings.passPhrase, keyHash)
        var seedCheck = await checkSeedPhrase(phrase)
        seedCheck = JSON.parse(seedCheck)
        if (seedCheck.checkSeedPhrase == 'Ok') {
            this.props.setWalletPassPhrase(data.settings.passPhrase)
            this.setState({
              hasExistingWallet: true
            })
          }
        }
      }

      //reset to Zero
      if (!this.state.hasExistingWallet) {
        const coin = 'zero'
        const apiSelection = Math.floor(Math.random()*coins[coin].explorer.length)
        this.props.setCurrentCoin(coin)
        this.props.setInsightExplorer(coins[coin].explorer[apiSelection])
      }



    var seed
    var args
    const currentCoin = this.props.settings.currentCoin
    var walletFile = await walletExists(coins[currentCoin].networkname)
    walletFile = JSON.parse(walletFile)

    if (walletFile.exists) {
      try {

        args = [coins[currentCoin].networkname]
        args.push(coins[currentCoin].litewallet[0])
        args.push(coins[currentCoin].addressParams)
        seed = await initalizeWallet(args)
        seed = JSON.parse(seed)
        if (seed.seed != null) {
          this.props.setSeedPhrase(seed.seed)
          this.props.setBirthday(seed.birthday)
          this.props.setWalletLoaded(true)

          //set passphase on existing wallets
          if (this.props.settings.passPhrase == null) {
            var pass = encrypt(seed.seed, keyHash)
            this.props.setWalletPassPhrase(pass)
            this.setState({
              hasExistingWallet: true
            })
          } else {
            var pp = decrypt(this.props.settings.passPhrase, keyHash)
            if (pp != seed.seed) {
              alert("WARNING!!!" + args[0] + " seed phrase does not match the ZeroVerse's Master seed phrase.")
            }
          }
        }
      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(err)
        }
      }

    } else {
      try {

        args = [(coins[currentCoin].litewallet[0])]
        args.push(coins[currentCoin].addressParams)
        seed = await newWallet(args)

        seed = JSON.parse(seed)
        if (seed.seed != null) {
          this.props.setSeedPhrase(seed.seed)
          this.props.setBirthday(seed.birthday)
        }
      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(err)
        }
      }
    }

    this.setScreenSize()
    //window.addEventListener("orientationchange", this.setRotate)
    window.plugins.insomnia.keepAwake()
    //Database name

    this.setState({
      Initalized: true,
    })

  }

  async saveData () {
    if (!this.savingFile) {
      if (this.props.settings.passPhrase !== null && this.props.settings.password !== null && this.props.settings.saveData === true) {
        // Write to file
        this.savingFile = true
        try {
          const data = {settings: this.props.settings}
          const folder = await getLocalFileSystemURL()
          const file = await getFileEntry(folder, ZERO_MOBILE_SAVE_PATH)
          await writeDataToFile(file, data)
          this.savingFile = false
        } catch {
          this.savingFile = false
        }
      }
    }
  }


  backButtonHandler () {

    if (this.props.mainSubPage.mainPage != 'visible') {
      this.props.setMainPage('visible')
      this.props.setSendPage('none')
      this.props.setReceivePage('none')
      this.props.setPrivateKeyPage('none')
      this.props.setSeedPage('none')

    } else if (this.props.context.selectCoin || this.props.context.reindexWallet) {
      if (this.props.context.saving) {
        alert("Back button disabled on this screen.")
      } else {
      this.props.setSelectCoin(false)
      this.props.setReindexWallet(false)
      }
    } else {
      if (confirm("Exit App?")) {
        navigator.app.exitApp()
      }
    }
  }

  async enableFirebase(b) {
    try {
      await crashlyticsEnabled(b)
      if (process.env.NODE_ENV != 'production') {
        console.log("Crashlytics data collection is enabled")
      }
      this.props.setFirebase(true)
    } catch (err) {
      if (process.env.NODE_ENV != 'production') {
        console.error("Crashlytics data collection couldn't be enabled "+err)
      }
        this.props.setFirebase(false)
    }
  }

  componentDidMount() {

    this.enableFirebase(true)

    document.addEventListener('backbutton', this.backButtonHandler, false)

    readFromFile(ZERO_MOBILE_SAVE_PATH, (data) => {
      // If errors while we're reading the JSOn
      // then just assume its empty

      this.setState({stringData: 'JSON file ' + data})

      try {
        data = JSON.parse(data)
        this.setState({data: data})
      } catch (err) {
          data = {}
      }


      // Get settings
      if (data.settings !== undefined) {

        if (data.settings.displayDimensions !== undefined) {
          this.props.setDisplayDimensions(data.settings.displayDimensions)
          this.props.setDimensions(data.settings.displayDimensions)
        }

        if (data.settings.currentCoin !== undefined) {
          this.props.setCurrentCoin(data.settings.currentCoin)
        }

        //set API & Explorer based on coin
        const coin = this.props.settings.currentCoin
        const apiSelection = Math.floor(Math.random()*coins[coin].explorer.length)
        this.props.setInsightExplorer(coins[coin].explorer[apiSelection])

        if (data.settings.noteInputs !== undefined) {
          this.props.setNoteInputs( data.settings.noteInputs)
        }

        if (data.settings.processTime !== undefined) {
          this.props.setProcessTime( data.settings.processTime)
        }

        if (data.settings.language !== undefined) {
          this.props.setLanguage( data.settings.language)
        }

        if (data.settings.currency !== undefined && data.settings.currency !== null) {
          this.props.setCurrency(data.settings.currency)
        }

        if (data.settings.password !== undefined && data.settings.password !== null) {
          this.props.setWalletPassword(data.settings.password)

          this.setState({
            hasExistingPin: true
          })
        }
      }

      if (this.state.parseError === false) {
        this.setState({
          readSavedFile: true
        })
      }


    }, (err) => {

      if (this.state.parseError === false) {
        this.setState({
          readSavedFile: true
        })
      }
      if (process.env.NODE_ENV != 'production') {
        console.log(err)
      }
    })

    this.props.setSaveData(true)

  }

  componentWillUnmount() {
    clearTimeout(this.InitId)
  }

  render() {
    this.saveData()

    var screenDim = this.props.context.dimensions

    var app

    if (!this.state.readSavedFile || !this.state.Initalized) {
        app =  <LoginGrid>
                  <LoginForm>
                  </LoginForm>
                  <LoginFormOpaque visible={'visible'}>
                    <br/>
                    <LoginHeading>
                      <LoginHeadingImg src={heading}/>
                    </LoginHeading>
                    <br/><br/><br/>
                    <RingSpinner/>
                    <LoginSocialContainer>
                      <a href="https://www.zero.directory">
                        <LoginSocial src={zerologo}/>
                      </a>
                      <a href="https://github.com/zerocurrencycoin">
                        <LoginSocial src={github}/>
                      </a>
                      <a href="https://twitter.com/ZeroCurrencies">
                        <LoginSocial src={twitter}/>
                      </a>
                      <a href="https://t.me/zerocurrency">
                        <LoginSocial src={telegram}/>
                      </a>
                      <a href="https://discordapp.com/invite/Jq5knn5">
                        <LoginSocial src={discord}/>
                      </a>
                    </LoginSocialContainer>
                  </LoginFormOpaque>
                </LoginGrid>
    } else {
      if (!this.state.hasExistingPin) {
        app = <SetPasswordPage onComplete={() => {
          this.setState({
            hasExistingPin: true,
            hasInputPin: true,
            Initalized: false
          })
          this.runInitalize()
        }} />
      } else {
        if(!this.state.hasInputPin) {
          app = <LoginPage onComplete={() => {
            this.setState({
              hasInputPin: true,
              Initalized: false
            })
            this.runInitalize()
          }} />
        } else {
          if(!this.state.hasExistingWallet) {
            app = <SetWalletPage setHasExistingWallet={(v) => this.setState({ hasExistingWallet: v })}/>
          } else {
            if (this.props.context.selectCoin) {
              app = <CoinPage />
            } else {
              if (!this.props.context.walletLoaded) {
                app = <CoinPage />
              } else {
                  if (this.props.context.reindexWallet) {
                  app = <ReindexPage />
                } else {
                  app = <MainPage />
                }
              }
            }
          }
        }
      }
    }

    var theme = getTheme(screenDim)

        return (
          <div>
            <ThemeProvider theme = {theme}>
              {app}
            </ThemeProvider>
          </div>

        )
    }
}


App.propTypes = {
  setFirebase: PropTypes.func.isRequired,
  setWalletLoaded: PropTypes.func.isRequired,
  setSelectCoin: PropTypes.func.isRequired,
  setReindexWallet: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  setSendPage: PropTypes.func.isRequired,
  setReceivePage: PropTypes.func.isRequired,
  setPrivateKeyPage: PropTypes.func.isRequired,
  setSeedPage: PropTypes.func.isRequired,
  setCurrentCoin: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired,
  setNoteInputs: PropTypes.func.isRequired,
  setProcessTime: PropTypes.func.isRequired,
  setWalletPassword: PropTypes.func.isRequired,
  setWalletPassPhrase: PropTypes.func.isRequired,
  setInsightExplorer: PropTypes.func.isRequired,
  setMinimumBlock: PropTypes.func.isRequired,
  setDisplayDimensions: PropTypes.func.isRequired,
  setSaveData: PropTypes.func.isRequired,
  setBirthday: PropTypes.func.isRequired,
  setSeedPhrase: PropTypes.func.isRequired,
  setDimensions: PropTypes.func.isRequired,
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
      setFirebase,
      setWalletLoaded,
      setSelectCoin,
      setReindexWallet,
      setMainPage,
      setSendPage,
      setReceivePage,
      setPrivateKeyPage,
      setSeedPage,
      setCurrentCoin,
      setLanguage,
      setCurrency,
      setNoteInputs,
      setProcessTime,
      setWalletPassword,
      setWalletPassPhrase,
      setInsightExplorer,
      setMinimumBlock,
      setDisplayDimensions,
      setSaveData,
      setBirthday,
      setSeedPhrase,
      setDimensions,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(App)
