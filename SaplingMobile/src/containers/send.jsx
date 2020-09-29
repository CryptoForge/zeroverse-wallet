import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {setMainPage,setSendPage} from '../actions/MainSubPage'
import {setQrScanning} from '../actions/Context'
import {setProcessTime} from '../actions/Settings'

import { send } from '../utils/litewallet'

import AddressDropdown from '../containers/addressdropdown'
import RingSpinner from '../containers/spinner'

import {
  SendDiv,
  SendPageTitle,
  SendSectionOverScroll,
  SendSection,
  AddressSelectSection,
  AddressSelectHeading,
  ConfirmDataSection,
  ConfirmData,
  ConfirmButtonSection,
  ConfirmSendButton,
  ConfirmCancelButton,
  ConfirmPin,
  ConfirmPassword,
  ConfirmPasswordSection,
  SendAddress,
  SendAddressSection,
  AmountSection,
  AmountInput,
  FeeSection,
  MemoSection,
  MemoArea,
  ButtonTopSection,
  ButtonBottomSection,
  SendOkButton,
  SendCancelButton,
  SendQrButton,
  TransactionLink,
  AddressBalanceNumberDiv,
  AddressCurrencyDiv,
  SpinnerSection} from '../components/send'


class Send extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      sendToAddress: '',
      fee: 0.0001,
      amount: 0.0000,
      memo: '',
      spendPath: '',
      outputPath: '',
      transactionInput: 'visible',
      transactionConfirm: 'none',
      transactionSuccess: false,
      transactionFailed: false,
      txid: '',
      password: '',
      validPassword: false,
      noteQty: 0,
      showButtons: false,
      building: false,
      estimatedBuildTime: 0,
      actualBuildTime: 0,
      start: 0

    }

    this.scrollRef = React.createRef()

    //State Updates
    this.setMemo = this.setMemo.bind(this)
    this.setSendToAddress = this.setSendToAddress.bind(this)
    this.setFee = this.setFee.bind(this)
    this.setAmount = this.setAmount.bind(this)
    this.setSpendPath = this.setSpendPath.bind(this)
    this.setOutputPath = this.setOutputPath.bind(this)
    this.setTransactionInput = this.setTransactionInput.bind(this)
    this.setTransactionConfirm = this.setTransactionConfirm.bind(this)
    this.setTransactionSuccess = this.setTransactionSuccess.bind(this)
    this.setTransactionFailed = this.setTransactionFailed.bind(this)
    this.setTxid = this.setTxid.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.setValidPassword = this.setValidPassword.bind(this)
    this.setNoteQty = this.setNoteQty.bind(this)
    this.setShowButtons = this.setShowButtons.bind(this)
    this.setBuilding = this.setBuilding.bind(this)
    this.setEstimatedBuildTime = this.setEstimatedBuildTime.bind(this)
    this.setActualBuildTime = this.setActualBuildTime.bind(this)
    this.buildTimer = this.buildTimer.bind(this)
    this.clearBuildTimer = this.clearBuildTimer.bind(this)
    this.setStart = this.setStart.bind(this)

    //Other Functions
    this.createSpend = this.createSpend.bind(this)
    this.resetSpend = this.resetSpend.bind(this)
    this.safeReleaseCamera = this.safeReleaseCamera.bind(this)
    this.handleQRScan = this.handleQRScan.bind(this)
    this.getInputs = this.getInputs.bind(this)
    this.msToTime = this.msToTime.bind(this)
    this.resetScroll = this.resetScroll.bind(this)
  }

    //State Updates
    setMemo (s) {this.setState({memo: s})}
    setSendToAddress (s) {this.setState({sendToAddress: s})}
    setFee (s) {this.setState({fee: s})}
    setAmount (s) {this.setState({amount: s})}
    setTransactionInput (s) {this.setState({transactionInput: s})}
    setTransactionConfirm (s) {this.setState({transactionConfirm: s})}
    setTransactionSuccess (s) {this.setState({transactionSuccess: s})}
    setTransactionFailed (s) {this.setState({transactionFailed: s})}
    setValidPassword (s) {this.setState({validPassword: s})}
    setTxid (s) {this.setState({txid: s})}
    setNoteQty (s) {this.setState({noteQty: s})}
    setShowButtons (s) {this.setState({showButtons: s})}
    setBuilding (s) {this.setState({building: s})}
    setEstimatedBuildTime (s) {this.setState({estimatedBuildTime: s})}
    setActualBuildTime (s) {this.setState({actualBuildTime: s})}
    setStart (s) {this.setState({start: s})}

    setPassword (p) {
      if (p.length >= 8) {
        p = p.substring(0,8)
      }

      if (p.length == 8) {
        if (p == this.props.context.activePassword) {
          this.setState({
            validPassword: true,
            showButtons: true,
            password: p
          })
        } else {
          this.setState({
            validPassword: false,
            password: ''
          })
        }
      } else {
        this.setState({
          password: p
        })
      }
    }

    //Takes Cordova FileEntry
    setSpendPath (s) {this.setState({spendPath: s.fullPath})}
    setOutputPath (s) {this.setState({outputPath: s.fullPath})}

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
          QRScanner.scan(function (err, address) {
            // an error occurred, or the scan was canceled (error code `6`)
            if (err) {
              alert(JSON.stringify(err))
            } else {
              // The scan completed, display the contents of the QR code
              this.setState({
                sendToAddress: address
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

    async getInputs() {


    }

    async createSpend() {
      this.setBuilding(true)




      var start = Date.now()
      this.setStart(start)
      this.buildTimer()

      var sendtx = {
        input: this.props.context.address,
        fee: parseInt(this.state.fee * 1e08),
        output: [],
      }
      sendtx.output.push({
        address: this.state.sendToAddress,
        amount: parseInt(this.state.amount * 1e08),
        memo: this.state.memo
      })

      sendtx = JSON.stringify(sendtx)

      console.log(sendtx)

      var tx = await send(sendtx)
      console.log(tx)

      var processingTime = Date.now() - start
      this.setActualBuildTime(processingTime)
      this.clearBuildTimer()
      this.setShowButtons(true)
      this.setBuilding(false)

      try {
        var ptx = JSON.parse(tx)
        if (ptx.txid != null) {
          this.setTransactionSuccess(true)
          this.setTxid(ptx.txid)
        } else {
          this.setTransactionFailed(true)
          alert('Tx build failure! ' + ptx.error)
        }
      } catch {
        this.setTransactionFailed(true)
        alert('Tx build failure! ' + tx)
      }

      this.setShowButtons(true)
      this.setBuilding(false)
    }

    resetSpend() {
      this.setSendToAddress('')
      this.setMemo('')
      this.setFee(0.0001)
      this.setAmount(0)
      this.setPassword('')
      this.setValidPassword(false)
      this.setTxid('')
      this.setTransactionSuccess(false)
      this.setTransactionFailed(false)
      this.setShowButtons(false)
      this.setBuilding(false)
      this.setActualBuildTime(0)
      this.resetScroll(0)
    }

    buildTimer() {
      this.buildID = setInterval(
        () => this.setActualBuildTime(Date.now() - this.state.start),100
      )
    }

    clearBuildTimer() {
      clearInterval(this.buildID)
    }

    msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }

    resetScroll (p) {
      this.scrollRef.current.scrollTop = p
    }


    componentDidMount() {
    }

    componentWillUnmount () {
      this.safeReleaseCamera()
      this.clearBuildTimer()
    }



    render () {
        var address = this.props.context.address

        var displaySendButton
        var displaySendPassword
        var displayConfirm

        if (this.state.transactionSuccess == true) {
          displaySendPassword = 'none'
          displaySendButton = 'none'
          displayConfirm = 'visible'
        } else {
          displaySendPassword = 'visible'
          displaySendButton = 'visible'
          displayConfirm = 'none'
        }

        if (this.state.showButtons == false) {
          displayConfirm = 'none'
        }

        var displaySpinner = 'none'
        var spinner = ''
        if (this.state.building == true) {
          displaySendButton = 'none'
          displaySendPassword = 'none'
          displaySpinner = 'visible'
          spinner = <RingSpinner />
        }

        var sendButton
        if (this.state.validPassword == true) {
          displaySendPassword = 'none'
          sendButton = <ConfirmSendButton
                          onClick={() => {
                            this.resetScroll(0)
                            this.setShowButtons(false)
                            this.createSpend()}}>
                          Send
                        </ConfirmSendButton>
        } else {
          sendButton = <ConfirmSendButton disabled = {true}>
                        Send
                        </ConfirmSendButton>
        }

        var preSendButton = <SendOkButton  disabled = {true}>Send</SendOkButton>

        if (this.state.amount > 0) {
          var addrBal = this.props.context.balance / 1e08
          var sendAmt = parseFloat(this.state.amount) + parseFloat(this.state.fee)
          if (addrBal >= sendAmt) {
            preSendButton = <SendOkButton
                onClick={() => {
                  this.resetScroll(0)
                  this.setTransactionConfirm('visible')
                  this.setTransactionInput('none')
                  this.getInputs()
                }}>
                Send
              </SendOkButton>
          }
        }


        var addressListDisplay
        if (this.props.mainSubPage.addressList == 'none') {
          addressListDisplay = {display: 'none'}
        } else {
          addressListDisplay = {}
        }

        return (
          <SendDiv visible={this.props.mainSubPage.sendPage}>
            <SendSectionOverScroll ref = {this.scrollRef}>

              <SendSection visible={this.state.transactionConfirm}>
                <SendPageTitle>
                  {"Confirm Transaction"}
                </SendPageTitle>

                <ConfirmDataSection>
                  <ConfirmData>
                    {'Send from Address:'}
                  </ConfirmData>

                  <ConfirmData>
                    {address}
                  </ConfirmData>

                  <br/>

                  <ConfirmData>
                    {'Send to Address:'}
                  </ConfirmData>

                  <ConfirmData>
                    {this.state.sendToAddress}
                  </ConfirmData>

                  <br/>

                  <ConfirmData>
                    {'Amount: ' + (this.state.amount/1.0).toFixed(8)}
                  </ConfirmData>
                  <ConfirmData>
                    {'Fee: ' + (this.state.fee/1.0).toFixed(8)}
                  </ConfirmData>

                  <br/>

                  <ConfirmPasswordSection visible={'visible'}>
                    <ConfirmData>
                      {'Build time: ' + this.msToTime(this.state.actualBuildTime)}
                    </ConfirmData>
                  </ConfirmPasswordSection>


                  <ConfirmPasswordSection visible={displaySendPassword}>
                    <ConfirmPassword>
                      Enter 8-Digit Pin to Send
                      <br/>
                      <ConfirmPin

                        type="password"
                        value={this.state.password}
                        onChange={e => this.setPassword(e.target.value)} />
                    </ConfirmPassword>
                  </ConfirmPasswordSection>
                  <ConfirmPasswordSection visible={displaySendButton}>
                    <br/>
                    <ConfirmButtonSection>
                      {sendButton}
                      <ConfirmCancelButton
                      onClick={() => {
                        this.setTransactionConfirm('none')
                        this.setTransactionInput('visible')
                        this.setTransactionFailed(false)
                        this.setPassword('')
                        this.setValidPassword(false)
                      }}>
                      Cancel
                      </ConfirmCancelButton>
                    </ConfirmButtonSection>
                  </ConfirmPasswordSection>


                  <ConfirmPasswordSection visible={displayConfirm}>
                    <br/>
                    <TransactionLink href={this.props.settings.explorerURL + 'tx/' + this.state.txid}>
                      Show Completed Transaction
                    </TransactionLink>
                    <br/><br/><br/>
                    <ConfirmButtonSection>
                      <ConfirmSendButton
                      onClick={() => {
                        this.resetSpend()
                        this.setTransactionConfirm('none')
                        this.setTransactionInput('visible')
                      }}>
                      New
                      </ConfirmSendButton>
                      <ConfirmCancelButton
                      onClick={() => {
                        this.resetSpend()
                        this.setTransactionConfirm('none')
                        this.setTransactionInput('visible')
                        this.props.setMainPage('visible')
                        this.props.setSendPage('none')
                      }}>
                      Done
                      </ConfirmCancelButton>
                    </ConfirmButtonSection>
                  </ConfirmPasswordSection>
                </ConfirmDataSection>
                <SpinnerSection visible = {displaySpinner}>
                  {spinner}
                </SpinnerSection>
              </SendSection>

              <SendSection visible={this.state.transactionInput}>
                <SendPageTitle>
                  {'Create Transaction'}
                </SendPageTitle>

                <AddressSelectSection>
                  <AddressSelectHeading>
                    {"Select from Address:"}
                  </AddressSelectHeading>
                  <AddressDropdown />

                  <div style = {addressListDisplay}>
                    <br/>
                    <AddressBalanceNumberDiv>
                      {((this.props.context.balance / 1e08).toFixed(8)) + ' ' + this.props.settings.currentCoin}
                    </AddressBalanceNumberDiv>
                    <AddressCurrencyDiv>
                      {((this.props.context.balance / 1e08) * this.props.context.BTCValue).toFixed(8) + ' BTC'}
                      <br/>
                      {((this.props.context.balance / 1e08)  * this.props.context.currencyValue).toFixed(6) + ' USD'}
                    </AddressCurrencyDiv>
                  </div>
                </AddressSelectSection>


                <div style = {addressListDisplay}>
                  <SendAddressSection>
                    {"Send to Address:"}
                    <br/>
                    <SendAddress
                      value={this.state.sendToAddress}
                      onFocus={() => this.resetScroll(this.props.context.dimensions.height * 0.26)}
                      onBlur={() => this.resetScroll(0)}
                      onChange={e => this.setSendToAddress(e.target.value)}  />
                  </SendAddressSection>
                  <MemoSection>
                    {"Memo:"}
                    <br/>
                    <MemoArea
                      value={this.state.memo}
                      onFocus={() => this.resetScroll(this.props.context.dimensions.height * 0.26)}
                      onBlur={() => this.resetScroll(0)}
                      onChange={e => this.setMemo(e.target.value)}  />
                  </MemoSection>
                  <AmountSection>
                    {"Amount: "}
                    <AmountInput type="number"
                      value={this.state.amount}
                      onFocus={() => this.resetScroll(this.props.context.dimensions.height * 0.26)}
                      onBlur={() => this.resetScroll(0)}
                      onChange={e => this.setAmount(e.target.value)} />
                  </AmountSection>
                  <FeeSection>
                    {"Fee: "}
                    <AmountInput type="number"
                      value={this.state.fee}
                      onFocus={() => this.resetScroll(this.props.context.dimensions.height * 0.26)}
                      onBlur={() => this.resetScroll(0)}
                      onChange={e => this.setFee(e.target.value)} />
                  </FeeSection>

                  <ButtonTopSection>
                    <SendQrButton onClick={() => {this.handleQRScan()}}>
                      QR
                    </SendQrButton>
                    <SendCancelButton
                      onClick={() => {
                        this.resetSpend()
                        this.props.setMainPage('visible')
                        this.props.setSendPage('none')
                        }}>
                      Cancel
                    </SendCancelButton>
                  </ButtonTopSection>
                  <ButtonBottomSection>
                    {preSendButton}
                  </ButtonBottomSection>

                </div>
              </SendSection>
            </SendSectionOverScroll>
          </SendDiv>
        )
    }

  }


Send.propTypes = {
  setMainPage: PropTypes.func.isRequired,
  setSendPage: PropTypes.func.isRequired,
  setQrScanning: PropTypes.func.isRequired,
  setProcessTime: PropTypes.func.isRequired,
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
      setSendPage,
      setMainPage,
      setQrScanning,
      setProcessTime
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Send)
