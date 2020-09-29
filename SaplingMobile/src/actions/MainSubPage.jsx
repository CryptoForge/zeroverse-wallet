export const SET_SUB_PAGE_MAIN = 'SET_CURRENT_SUB_PAGE_MAIN'
export const SET_SUB_PAGE_SEND = 'SET_CURRENT_SUB_PAGE_SEND'
export const SET_SUB_PAGE_RECEIVE = 'SET_CURRENT_SUB_PAGE_RECEIVE'
export const SET_SUB_PAGE_PRIVATE_KEY = 'SET_CURRENT_SUB_PAGE_PRIVATE_KEY'
export const SET_SUB_PAGE_SEED = 'SET_CURRENT_SUB_PAGE_SEED'
export const SET_SUB_PAGE_TX = 'SET_CURRENT_SUB_PAGE_TX'
export const SET_SUB_PAGE_ADDRESSLIST = 'SET_CURRENT_SUB_PAGE_ADDRESSLIST'

export function setMainPage (mainPage) {
  return {
    type: SET_SUB_PAGE_MAIN,
    mainPage
  }
}

export function setSendPage (sendPage) {
  return {
    type: SET_SUB_PAGE_SEND,
    sendPage
  }
}

export function setReceivePage (receivePage) {
  return {
    type: SET_SUB_PAGE_RECEIVE,
    receivePage
  }
}

export function setPrivateKeyPage (privateKeyPage) {
  return {
    type: SET_SUB_PAGE_PRIVATE_KEY,
    privateKeyPage
  }
}

export function setSeedPage (seedPage) {
  return {
    type: SET_SUB_PAGE_SEED,
    seedPage
  }
}

export function setTxPage (txPage) {
  return {
    type: SET_SUB_PAGE_TX,
    txPage
  }
}

export function setAddressList (addressList) {
  return {
    type: SET_SUB_PAGE_ADDRESSLIST,
    addressList
  }
}
