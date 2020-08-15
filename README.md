# Bitcoin Address Generator
<img alt="downloads" src="https://img.shields.io/npm/dt/btcaddressgen?style=flat-square"> <img alt="version" src="https://img.shields.io/npm/v/btcaddressgen?style=flat-square"> <img alt="issues" src="https://img.shields.io/github/issues/ferrriii/btc-address?style=flat-square"> <img alt="package size" src="https://img.shields.io/bundlephobia/minzip/btcaddressgen?style=flat-square"> <img alt="forks" src="https://img.shields.io/github/forks/ferrriii/btc-address?style=flat-square"> <img alt="stars" src="https://img.shields.io/github/stars/ferrriii/btc-address?style=flat-square"> <img alt="license" src="https://img.shields.io/github/license/ferrriii/btc-address?style=flat-square"> <img alt="programming language" src="https://img.shields.io/github/languages/top/ferrriii/btc-address?style=flat-square"> <img alt="test status" src="https://img.shields.io/github/workflow/status/ferrriii/btc-address/test?label=test">

a simple js library for generating Bitcoin paper wallet

## Features
* Tested
* Generates compressed WIF and Hex output
* Minimum dependencies
* Can generate prefixed addresses

## Install
```
npm install btcaddressgen
```

## Usage
```JavaScript
const BTCAddress = require('btcaddressgen')

let address = BTCAddress.generate()
console.log(address)
```
Output:
```JavaScript
{
  // private key in WIF format
  private: '5Hy5wbRdtv57RMZxhh518tV5CT8sXy8RyMH1XaiN5pDN88gC4GG',
  // public address in WIF format
  public: '1DRJZWjfxWo2Y7oaNbhP4KqRWzUAYZSAc6',
  // public address in hex
  publicHex: '03390DBDE81F0397C65681887571E1C4D9B77956A7882945D07DE90C16865D755D',
  // private address in hex
  privateHex: '13FADCE55428817FE93F5B8DEBCD8B85259527354A6DC3290D53EE2C6FE17902'
}
```

### Usage with options
You can pass an object to control address generation. Possible options are describe in below table.

| Property | Description |
| -------- | ------------ |
| privateKeyHex | If you pass a valid hex private key, it will be used to generate public key. |
| prefix | If you pass a string starting with '1', public key will be generated with this prefix. |
| prefixCaseSensitive | By default the prefix is not case-sensitive. If you want it to be case sensitive pass this property in options. |

### Examples
Generating an address for the provided private key:
```JavaScript
const BTCAddress = require('btcaddressgen')
BTCAddress.generate({ privateKeyHex: '58257552f213f449f03b3d0c7684d7bfa48cceba4f739913d28bda33ae64ac49' })
```
Generating address with prefix:
```JavaScript
const BTCAddress = require('btcaddressgen')
BTCAddress.generate({ prefix: '1omg' }) // valid addresses start with 1
```
## Test
```
npm run test
```
