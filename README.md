# ZeroVerse-Wallet

ZeroVerse mobile app built using Redux, React and Webpack.

Use Node v12, installed with nvm
https://github.com/nvm-sh/nvm

Use Cordova v10
https://cordova.apache.org/docs/en/latest/guide/cli/



## Setup instructions

```
npm install -g yarn cordova
git clone https://github.com/zerocurrencycoin/ZeroVerse-Wallet.git
cd ZeroVerse-Wallet
git checkout master
yarn install
```

## Android
Requires Android SDK (Recommend Full Studio) and Oracle Java to be installed
```
cordova platform add android@9
cordova run android
```

Note: Cordova-cli fails when passing the --release flag. Release builds must be compiled using Android Studio.

## iOS

In Progress
