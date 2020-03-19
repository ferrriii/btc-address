const BTCAddress = require('../index.js')

let address
address = BTCAddress.generate({ privateKeyHex: '58257552f213f449f03b3d0c7684d7bfa48cceba4f739913d28bda33ae64ac49' })
verify('Public key generated correct for 58257552f213f449f03b3d0c7684d7bfa48cceba4f739913d28bda33ae64ac49', address.public == '15NDwcev2y99DtEDPieu4QQrqnuVwZaVXg')
verify('Private key generated correct for 58257552f213f449f03b3d0c7684d7bfa48cceba4f739913d28bda33ae64ac49', address.private == '5JV7AHp2jhzyP3xXAgBj355WEyB8oUnC38BKW3RsbJqh8HqJdps')
verify('Public hex key generated correct for 58257552f213f449f03b3d0c7684d7bfa48cceba4f739913d28bda33ae64ac49', address.publicHex == '029ECE9E014FAD6DC072DC37CAB9E7820A357BD6D865BF4B69E0C29C2415FF38F6')
verify('Private hex key generated correct for 58257552f213f449f03b3d0c7684d7bfa48cceba4f739913d28bda33ae64ac49', address.privateHex == '58257552F213F449F03B3D0C7684D7BFA48CCEBA4F739913D28BDA33AE64AC49')

address = BTCAddress.generate({ privateKeyHex: '78257552f213f449f03b3d0c7684d7bfa48cceba4f739913d28bda33ae64ac40' })
verify('Public key generated correct for 78257552f213f449f03b3d0c7684d7bfa48cceba4f739913d28bda33ae64ac40', address.public == '1J1fTfckktcupnDt8Kn5HpvJsShiigvdeL')
verify('Private key generated correct for 78257552f213f449f03b3d0c7684d7bfa48cceba4f739913d28bda33ae64ac40', address.private == '5JjCZKVXy8qNmn9z2kPUXjerMcFbkwdoPL4anK1rqmLjvRFfUrY')
verify('Public hex key generated correct for 78257552f213f449f03b3d0c7684d7bfa48cceba4f739913d28bda33ae64ac40', address.publicHex == '020801D12361DB0183613CD16A84B9C4E1AE4093DB58A5CA646F7BBC61A2BD3977')
verify('Private hex key generated correct for 78257552f213f449f03b3d0c7684d7bfa48cceba4f739913d28bda33ae64ac40', address.privateHex == '78257552F213F449F03B3D0C7684D7BFA48CCEBA4F739913D28BDA33AE64AC40')

address = BTCAddress.generate({ privateKeyHex: 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140' })
verify('Public key generated correct for largest possible key= FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140', address.public == '1GrLCmVQXoyJXaPJQdqssNqwxvha1eUo2E')
verify('Private key generated correct for largest possible key= FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140', address.private == '5Km2kuu7vtFDPpxywn4u3NLpbr5jKpTB3jsuDU2KYEqetqj84qw')
verify('Public hex key generated correct for largest possible key= FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140', address.publicHex == '0379BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798')
verify('Private hex key generated correct for largest possible key= FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140', address.privateHex == 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140')

address = BTCAddress.generate({ privateKeyHex: '0000000000000000000000000000000000000000000000000000000000000001' })
verify('Public key generated correct for smallest possible key= 0000000000000000000000000000000000000000000000000000000000000001', address.public == '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH')
verify('Private key generated correct for smallest possible key= 0000000000000000000000000000000000000000000000000000000000000001', address.private == '5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEsreAnchuDf')
verify('Public hex key generated correct for smallest possible key= 0000000000000000000000000000000000000000000000000000000000000001', address.publicHex == '0279BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798')
verify('Private hex key generated correct for smallest possible key= 0000000000000000000000000000000000000000000000000000000000000001', address.privateHex == '0000000000000000000000000000000000000000000000000000000000000001')

verify('Error returned for invalid private key= FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141', BTCAddress.generate({ privateKeyHex: 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141' }).public == undefined)
verify('Error returned for invalid prefix abc', BTCAddress.generate({ prefix: 'abc' }).error)
verify('Public key generated correct with prefix 11', BTCAddress.generate({ prefix: '11' }).public.startsWith('11'))
verify('Public key generated correct with case-insensitive prefix 1a', BTCAddress.generate({ prefix: '1a' }).public.toLowerCase().startsWith('1a'))
verify('Public key generated correct with case-sensitive prefix 1A', BTCAddress.generate({ prefix: '1A', prefixCaseSensitive: true }).public.startsWith('1A'))

function verify(test, expression) {
	if (expression) {
		console.log('PASSED: ' + test)
	} else {
		console.log('FAILED: ' + test)
	}
}
