// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill
import '@babel/polyfill'

import {
  SET_SUB_PAGE_MAIN,
  SET_SUB_PAGE_SEND,
  SET_SUB_PAGE_RECEIVE,
  SET_SUB_PAGE_PRIVATE_KEY,
  SET_SUB_PAGE_SEED,
  SET_SUB_PAGE_TX,
  SET_SUB_PAGE_ADDRESSLIST,
} from '../actions/MainSubPage'

const initialMainSubPage= {
  mainPage: 'visible',
  sendPage: 'none',
  receivePage: 'none',
  privateKeyPage: 'none',
  seedPage: 'none',
  txPage: 'none',
  addressList: 'visible'
}

export default function MainSubPageReducer (state = initialMainSubPage, action) {
  switch (action.type) {
    case SET_SUB_PAGE_MAIN:
      return Object.assign({}, state, {
        mainPage: action.mainPage
      })

    case SET_SUB_PAGE_SEND:
      return Object.assign({}, state, {
        sendPage: action.sendPage
      })

    case SET_SUB_PAGE_RECEIVE:
      return Object.assign({}, state, {
        receivePage: action.receivePage
      })

    case SET_SUB_PAGE_PRIVATE_KEY:
      return Object.assign({}, state, {
        privateKeyPage: action.privateKeyPage
      })

    case SET_SUB_PAGE_SEED:
      return Object.assign({}, state, {
        seedPage: action.seedPage
      })

    case SET_SUB_PAGE_TX:
      return Object.assign({}, state, {
        txPage: action.txPage
      })

    case SET_SUB_PAGE_ADDRESSLIST:
      return Object.assign({}, state, {
        addressList: action.addressList
      })

    default:
      return state
  }
}
