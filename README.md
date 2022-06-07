# Ionic Angular Application called ViHelper

This application was an christmas gift and also an helper in certain situations created with the Ionic Framework and Angular.

**There is not an actual Ionic Conference at this time.** This project is just to show off Ionic components in a real-world application. Please go through the steps in [CONTRIBUTING](https://github.com/ionic-team/ionic-conference-app/blob/master/.github/CONTRIBUTING.md) before submitting an issue.

## Table of Contents
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [App Preview](#app-preview)
- [Deploying](#deploying)
  - [Progressive Web App](#progressive-web-app)
  - [Android](#android)
  - [iOS](#ios)


## Getting Started

* [Download the installer](https://nodejs.org/) for Node LTS.
* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository: `git clone https://github.com/ionic-team/ionic-conference-app.git`.
* Run `npm install` from the project root.
* Run `ionic serve` in a terminal from the project root.
* Profit. :tada:

_Note: See [How to Prevent Permissions Errors](https://docs.npmjs.com/getting-started/fixing-npm-permissions) if you are running into issues when trying to install packages globally._

## App Preview

### [Menu](https://github.com/ionic-team/ionic-conference-app/blob/master/src/app/pages/menu/menu.html)

| Material Design  | iOS  |
| -----------------| -----|
| ![Android Menu](/resources/github/menu_material.png) | ![iOS Menu](/resources/github/menu_ios.png) |


### [Shift hours Page](https://github.com/vincentagwu/ViHelper/blob/master/src/app/tab1/tab1.page.html)

| Material Design  | iOS  |
| -----------------| -----|
| ![Android Schedule](/resources/github/hourshift_material.png) | ![iOS Schedule](/resources/github/hourshift_ios.png) |

### [Car finding Page](https://github.com/vincentagwu/ViHelper/blob/master/src/app/tab2/tab2.page.html)

| Material Design  | iOS  |
| -----------------| -----|
| ![Android Speakers](/resources/github/car_material.png) | ![iOS Speakers](/resources/github/car_ios.png) |

### [Calendar Page](https://github.com/vincentagwu/ViHelper/blob/master/src/app/tab3/tab3.page.html)

| Material Design  | iOS  |
| -----------------| -----|
| ![Android Speaker Detail](/resources/github/calendar_material.png) | ![iOS Speaker Detail](/resources/github/calendar_ios.png) |

## Deploying

### Progressive Web App

1. Un-comment [these lines](https://github.com/ionic-team/ionic2-app-base/blob/master/src/index.html#L21)
2. Run `ionic build --prod`
3. Push the `www` folder to your hosting service

### Want to create an app (Android/iOS) install Capacitor first!
1. npm install @capacitor/ios @capacitor/android
2. npx cap add ios
3. npx cap add android

#### Android

1. Run `npx cap add android` to create a android project
2. Next `npx cap run android` to start up Android studio to run android app in it

#### iOS

1. Run `npx cap add ios` to create a iOS project
2. Next `npx cap open ios` to start up Xcode to run iOS app in it
