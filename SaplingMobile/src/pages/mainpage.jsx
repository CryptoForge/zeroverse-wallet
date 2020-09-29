import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Main from '../containers/main'
import Send from '../containers/send'
import Receive from '../containers/receive'
import PrivateKey from '../containers/privatekey'
import Seed from '../containers/seed'
import TransactionDetail from '../containers/transactionDetail'
import Qr from '../containers/qr'

class MainPage extends React.Component {

  constructor (props) {
    super(props)

  }

    render () {

      const mainStyle =  this.props.context.qrScanning ? {opacity: '0.0', display: 'none'} : {opacity: '1.0'}

      var page

      if (this.props.mainSubPage.mainPage == 'visible') {
        page = <Main />
      } else if (this.props.mainSubPage.receivePage == 'visible') {
        page = <Receive />
      } else if (this.props.mainSubPage.privateKeyPage == 'visible') {
        page = <PrivateKey />
      } else if (this.props.mainSubPage.seedPage == 'visible') {
        page = <Seed />
      } else if (this.props.mainSubPage.txPage == 'visible') {
        page = <TransactionDetail />
      }

      return (
        <div>
          <div style={mainStyle}>
            {page}
            <Send />
          </div>
          <Qr />
        </div>
      )
    }
  }

MainPage.propTypes = {
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
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(MainPage)
