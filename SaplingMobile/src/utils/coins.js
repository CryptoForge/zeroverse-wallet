import zeroLogo from '../assets/logo-white.png'
import zeroQrLogo from '../assets/logo-white-QR.png'
import arrowLogo from '../assets/arrow/logo.png'
import arrowQrLogo from '../assets/arrow/qrlogo.png'
import snowgemLogo from '../assets/snowgem/logo.png'
import snowgemQrLogo from '../assets/snowgem/qrlogo.png'
import pirateLogo from '../assets/pirate/logo.svg'
import pirateQrLogo from '../assets/pirate/qrlogo.svg'

export const coins = {
  zero: {
    networkname: 'zer',
    coinGeckoId: 'zero',
    icon: zeroLogo,
    qrlogo: zeroQrLogo,
    explorer: ['https://zersapling1.zeromachine.io/insight/',
               'https://zersapling2.zeromachine.io/insight/',
               'https://zersapling3.zeromachine.io/insight/'],
    litewallet: ['https://lightwalletd.zeromachine.io:443'],
    tEnabled: true,
    addressParams: {
      coin_type: '323',
      hrp_sapling_extended_spending_key: 'secret-extended-key-main',
      hrp_sapling_extended_full_viewing_key: 'zviews',
      hrp_sapling_payment_address: 'zs',
      b58_pubkey_address_prefix: '1cb8',
      b58_script_address_prefix: '1cbd',
    },
    branchHeight: {
      default: 0,
      unused: 1,
      overwinter: 492850,
      sapling: 492850
    }
  },
  arrow: {
    networkname: 'arw',
    coinGeckoId: 'arrow',
    icon: arrowLogo,
    qrlogo: arrowQrLogo,
    explorer: ['http://explorer.arrowchain.net/'],
    litewallet: ['https://lightwalletarw.zeromachine.io:443'],
    tEnabled: false,
    addressParams: {
      coin_type: '350',
      hrp_sapling_extended_spending_key: 'secret-extended-key-main',
      hrp_sapling_extended_full_viewing_key: 'aviews',
      hrp_sapling_payment_address: 'as',
      b58_pubkey_address_prefix: '130f',
      b58_script_address_prefix: '131b',
    },
    branchHeight: {
      default: 0,
      unused: 0,
      overwinter: 0,
      sapling: 1
    }
  },
  snowgem: {
    networkname: 'xsg',
    coinGeckoId: 'snowgem',
    icon: snowgemLogo,
    qrlogo: snowgemQrLogo,
    explorer: ['https://explorer.snowgem.org/'],
    litewallet: ['https://lightwalletxsg.zeromachine.io:443'],
    tEnabled: true,
    addressParams: {
      coin_type: '407',
      hrp_sapling_extended_spending_key: 'secret-extended-key-main',
      hrp_sapling_extended_full_viewing_key: 'zviews',
      hrp_sapling_payment_address: 'zs',
      b58_pubkey_address_prefix: '1c28',
      b58_script_address_prefix: '1c2d',
    },
    branchHeight: {
      default: 0,
      unused: 0,
      overwinter: 0,
      sapling: 1
    }
  },
  pirate: {
    networkname: 'arrr',
    coinGeckoId: 'pirate-chain',
    icon: pirateLogo,
    qrlogo: pirateQrLogo,
    explorer: ['https://explorer.pirate.black/'],
    litewallet: ['https://lightd.pirate.black:443/'],
    tEnabled: false,
    addressParams: {
      coin_type: '141',
      hrp_sapling_extended_spending_key: 'secret-extended-key-main',
      hrp_sapling_extended_full_viewing_key: 'zviews',
      hrp_sapling_payment_address: 'zs',
      b58_pubkey_address_prefix: '1cb8',
      b58_script_address_prefix: '1cbd',
    },
    branchHeight: {
      default: 0,
      unused: 0,
      overwinter: 0,
      sapling: 1
    }
  }
}
