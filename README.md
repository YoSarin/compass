# Installation
- install [nvm](https://github.com/nvm-sh/nvm#install--update-script):
  - ```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash```
- install [node](https://github.com/nodesource/distributions/blob/master/README.md#debinstall); v10.16.3 works
  - ```nvm install 10.16.3```
- install ```expo-cli```: ```npm install -g expo-cli```
- enter root of project and run ```npm install```
- take a tea or wine and wait

# Usage
- Install [Expo application](https://play.google.com/store/apps/details?id=host.exp.exponent) at your phone
- run ```npm start``` in the project root
  - browser should start, should display QR code - scan it with expo at phone and you'll get application sideloaded within expo on your phone

# \*.apk creation
- run ```expo build:android```
  - login to expo.com will be required
- build is done remotely on expo.io server
- download url of the package is provided in server dashboard

# IDE
- I do prefer [Atom.io](http://atom.io), with proper plugins (react, typescript, hyperlink, minimap, file-icons, ...)
