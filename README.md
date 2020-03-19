# text-copy
a simple js library for generating Bitcoin paper wallet

## Features
* Tested
* Generates compressed WIF and Hex output
* Minimum dependencies
* Can generate prefixed addresses

## Install
```
npm install btcaddress
```

## Usage
```JavaScript
const BTCAddress = require('btcaddress')

let address = BTCAddress.generate()
console.log(address)
```
will output:
```
{
  public: 'aaaaa', // WIF public address
  asdasd
}
```

### Usage with options
You can pass an object to control address generation. Possible options are describe in below table.

| Property | Description |
| -------- | ------------ |
| privateKeyHex | If you pass a valid hex private key, it will be used to generate the public key. |
| prefix | If you pass a string starting with '1', the public key will be generated with this prefix. |
| prefixCaseSensitive | By default the prefix is not case-sensitive. If you want it to be case sensitive pass this property in option. |

### Examples
Generating an address for the provided private key:
```
const BTCAddress = require('btcaddress')
BTCAddress.generate({ privateKeyHex: '58257552f213f449f03b3d0c7684d7bfa48cceba4f739913d28bda33ae64ac49' })
```
Generating address with prefix:
```
const BTCAddress = require('btcaddress')
BTCAddress.generate({ prefix: '1omg' }) // valid addresses start with 1
```
## Test
```
npm run test
```