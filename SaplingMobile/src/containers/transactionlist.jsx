import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {list} from '../utils/litewallet'

import {setMainPage,setTxPage} from '../actions/MainSubPage'
import {setTx, setWalletInUse} from '../actions/Context'

import {
  ListDiv,
  TransactionUl,
  TransactionLi,
  Col1Div,
  Col2Div,
  Col3Div,
  Col4Div,
  Col5Div,
  Spacer,
  PageSpacer,
  ArrowImg,
  TransactionButton} from '../components/transactionList'

import inArrow from '../assets/green_arrow.png'
import outArrow from '../assets/red_arrow.png'

class TransactionList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      transactionList: null,
      transactions: null
    }

    this.setTransactions = this.setTransactions.bind(this)
    this.setTransactionList = this.setTransactionList.bind(this)
    this.createTransactionList = this.createTransactionList.bind(this)
    this.toggleDetail = this.toggleDetail.bind(this)
  }

    setTransactions(tx) {
      this.setState({
        transactions: tx
      })
    }

    setTransactionList (b) {
      this.setState({
        transactionList: b
      })
    }

    toggleDetail(i) {
      this.props.setMainPage('none')
      this.props.setTxPage('visible')
      this.props.setTx(this.state.transactions[i])
    }

     async createTransactionList () {
      this.props.setWalletInUse(true)

      var transactions = []
      var index = 0

      var transactionList = await list()
      try {
          transactionList = JSON.parse(transactionList)
          transactionList.reverse()


          for (var t = 0; t < transactionList.length; t++) {
              var md
              var meta
              if (transactionList[t].incoming_metadata != null) {
                  meta = transactionList[t].incoming_metadata
                  for (md = 0; md < meta.length; md++) {
                      var itransaction = {
                            id: transactionList[t].txid + '-imd' + '-' + md,
                            txid: transactionList[t].txid,
                            address: meta[md].address,
                            value: meta[md].value,
                            memo: meta[md].memo,
                            block: transactionList[t].block_height == null ? 0 : transactionList[t].block_height,
                            type: 0,
                            index: index
                      }
                      index++
                      transactions.push(itransaction)
                  }
              }

              // if (transactionList[t].incoming_metadata_change != null) {
              //     meta = transactionList[t].incoming_metadata_change
              //     for (md = 0; md < meta.length; md++) {
              //         var ictransaction = {
              //               id: transactionList[t].txid + '-icmd' + '-' + md,
              //               txid: transactionList[t].txid,
              //               address: meta[md].address,
              //               value: meta[md].value,
              //               memo: meta[md].memo,
              //               block: transactionList[t].block_height == null ? 0 : transactionList[t].block_height,
              //               type: 0,
              //               index: index
              //         }
              //         index++
              //         transactions.push(ictransaction)
              //     }
              // }

              if (transactionList[t].outgoing_metadata != null) {
                  meta = transactionList[t].outgoing_metadata
                  for (md = 0; md < meta.length; md++) {
                      var otransaction = {
                            id: transactionList[t].txid + '-omd' + '-' + md,
                            txid: transactionList[t].txid,
                            address: meta[md].address,
                            value: meta[md].value * (-1),
                            memo: meta[md].memo,
                            block: transactionList[t].block_height == null ? 0 : transactionList[t].block_height,
                            type: 1,
                            index: index
                      }
                      index++
                      transactions.push(otransaction)
                  }
              }

              // if (transactionList[t].outgoing_metadata_change != null) {
              //     meta = transactionList[t].outgoing_metadata_change
              //     for (md = 0; md < meta.length; md++) {
              //         var octransaction = {
              //               id: transactionList[t].txid + '-ocmd' + '-' + md,
              //               txid: transactionList[t].txid,
              //               address: meta[md].address,
              //               value: meta[md].value * (-1),
              //               memo: meta[md].memo,
              //               block: transactionList[t].block_height == null ? 0 : transactionList[t].block_height,
              //               type: 1,
              //               index: index
              //         }
              //         index++
              //         transactions.push(octransaction)
              //     }
              // }


          }
        } catch (err) {
          if (process.env.NODE_ENV != 'production') {
            console.log(err.description)
          }
        }

          this.setTransactions(transactions)
          this.setTransactionList(
            <ListDiv>
                <TransactionUl header={true}>
                  <TransactionLi>
                    <Col1Div></Col1Div>
                    <Col2Div header={true}>Address</Col2Div>
                    <Col3Div></Col3Div>
                    <Col4Div header={true}>Value</Col4Div>
                  </TransactionLi>
                </TransactionUl>
                {transactions.map((tx) => (
                  <TransactionUl key={tx.id} header={false}>

                    <TransactionButton
                      onClick = { e => {
                        e.stopPropagation()
                        this.toggleDetail(tx.index)
                      }}>

                        <TransactionLi >
                          <Col1Div>{''}</Col1Div>
                          <Col2Div>
                            {tx.address.substring(0,8) + '...' + tx.address.substring(tx.address.length-8,tx.address.length)}
                          </Col2Div>
                          <Col3Div>
                            <ArrowImg src={tx.type==0 ? inArrow : outArrow}/>
                          </Col3Div>
                          <Col4Div>{(tx.value/1e08).toFixed(8).toString()}</Col4Div>
                          <Col5Div>{''}</Col5Div>
                        </TransactionLi>


                      </TransactionButton>
                      <Spacer/>
                  </TransactionUl>
                  ))}
                <PageSpacer />
            </ListDiv>
        )
        this.props.setWalletInUse(false)

        clearTimeout(this.ProcessID)
        if (this.props.context.synced) {
          this.ProcessID = setTimeout(
            () => {
              this.createTransactionList()
            },15000
          )
        } else {
          this.ProcessID = setTimeout(
            () => {
              this.createTransactionList()
            },2000
          )
        }
    }


    componentDidMount() {
      this.createTransactionList()
    }

    componentWillUnmount() {
      clearTimeout(this.ProcessID)
    }

    render () {
        return (
          <div>
            {this.state.transactionList == null
            ? <div></div>
            : this.state.transactionList}
          </div>
        )
    }

  }


TransactionList.propTypes = {
  setWalletInUse: PropTypes.func.isRequired,
  setTx: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  setTxPage: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    settings: state.settings,
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setWalletInUse,
      setTx,
      setMainPage,
      setTxPage
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(TransactionList)
