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
cd SaplingMobile
npm install
```

##Firebase instructions
Option 1: Build it without Firebase
```
cordova plugin remove cordova-plugin-firebasex
```

remove line 48 in the webpack.config.js

Option 2: Build it with firebase

Setup a firebase account and place the google-service.json file provided by firebase in /SaplingMobile (root cordova folder)

Note: Cordova doesn't provide a large enough heap to compile with firebase, the project must be prepared with cordova and built with Android Studio.

## Android
Requires Android SDK (Recommend Full Studio) and Oracle Java to be installed
```
cordova platform add android@9
cordova prepare android
cordova run android
```

Note: Cordova-cli fails when passing the --release flag. Release builds must be compiled using Android Studio.


## iOS

In Progress
