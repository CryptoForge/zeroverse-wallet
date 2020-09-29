import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
      TransactionDetailDiv,
      TransactionDetailSection,
      TransactionDetailPageTitle,

      TransactionDetailButtonSection,
      TransactionDetailExplorerButton,
      TransactionDetailCloseButton,

      TransactionDetailData,
      TransactionDetailLine,
      TransactionDetailLineHeader,
      TransactionDetailLineData,

} from '../components/transactionDetail'

import {setMainPage,setTxPage} from '../actions/MainSubPage'

class TransactionDetail extends React.Component {

  constructor (props) {
    super(props)

  }


    componentDidMount() {

    }

    render () {

        var tx
        if (this.props.context.tx != null) {
          tx =
            <TransactionDetailData>
              <TransactionDetailLine>
                <TransactionDetailLineHeader>
                  {'Address: '}
                </TransactionDetailLineHeader>
                <TransactionDetailLineData>
                  {this.props.context.tx.address}
                </TransactionDetailLineData>
              </TransactionDetailLine>
              <br/>
              <TransactionDetailLine>
                <TransactionDetailLineHeader>
                  {'Value: '}
                </TransactionDetailLineHeader>
                <TransactionDetailLineData>
                  {this.props.context.tx.value/1e08}
                </TransactionDetailLineData>
              </TransactionDetailLine>
              <br/>
              <TransactionDetailLine>
                <TransactionDetailLineHeader>
                  {'Type: '}
                </TransactionDetailLineHeader>
                <TransactionDetailLineData>
                  {this.props.context.tx.type == 0 ? 'Incoming' : 'Outgoing' }
                </TransactionDetailLineData>
              </TransactionDetailLine>
              <br/>
              <TransactionDetailLine>
                <TransactionDetailLineHeader>
                  {'Txid: '}
                </TransactionDetailLineHeader>
                <TransactionDetailLineData>
                  {this.props.context.tx.txid}
                </TransactionDetailLineData>
              </TransactionDetailLine>
              <br/>
              <TransactionDetailLine>
                <TransactionDetailLineHeader>
                  {'Block: '}
                </TransactionDetailLineHeader>
                <TransactionDetailLineData>
                  {this.props.context.tx.block}
                </TransactionDetailLineData>
              </TransactionDetailLine>
              <br/>
              <TransactionDetailLine>
                <TransactionDetailLineHeader>
                  {'Memo: '}
                </TransactionDetailLineHeader>
                <TransactionDetailLineData>
                  {this.props.context.tx.memo}
                </TransactionDetailLineData>
              </TransactionDetailLine>
            </TransactionDetailData>
        }


        return (
          <TransactionDetailDiv visible = {this.props.mainSubPage.txPage}>
            <TransactionDetailSection>
              <TransactionDetailPageTitle>
                {'Transaction Detail'}
              </TransactionDetailPageTitle>
              {tx}
              <TransactionDetailButtonSection>
                <TransactionDetailExplorerButton
                  onClick={(e) => {
                    e.stopPropagation()
                    window.location.href=this.props.settings.explorerURL + 'tx/' + this.props.context.tx.txid
                  }}>
                  Open Explorer
                </TransactionDetailExplorerButton>


                <TransactionDetailCloseButton
                  onClick={() => {
                    this.props.setMainPage('visible')
                    this.props.setTxPage('none')
                  }}>
                  Close
                </TransactionDetailCloseButton>
              </TransactionDetailButtonSection>



            </TransactionDetailSection>
          </TransactionDetailDiv>
        )
    }

  }


TransactionDetail.propTypes = {
  setMainPage: PropTypes.func.isRequired,
  setTxPage: PropTypes.func.isRequired,
  mainSubPage: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    mainSubPage: state.mainSubPage,
    settings: state.settings,
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setMainPage,
      setTxPage
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(TransactionDetail)
