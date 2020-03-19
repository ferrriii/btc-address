const secp256k1 = require('secp256k1/elliptic') // or require('secp256k1')
const RIPEMD160 = require('ripemd160')
const crypto = require('crypto');

function generate(options = {}) {
	if (options.prefix && options.prefix[0] !== '1') return { error: 'Prefix must start with 1' }

	let privKey
	if (options.privateKeyHex) {
		// use provided private key
		privKey = Uint8Array.from(Buffer.from(options.privateKeyHex, 'hex'));
		if (!secp256k1.privateKeyVerify(privKey)) return { error: 'Invalid private key' }
	} else {
		// generate privKey
		privKey = generatePrivateKey()
	}

	let pubKey = publicKey(privKey)

	if (options.prefix) {
		while (!testPrefix(pubKey, options)) {
			privKey = generatePrivateKey()
			pubKey = publicKey(privKey)
		}
	}


	return {
		'private': btcAddress(privKey, [0x80]), // WIF address
		'public': pubKey.encoded, // WIF address
		'publicHex': pubKey.hex, // Compressed hex
		'privateHex': buf2hex(privKey) // hex
	}
}

function testPrefix(pubKey, options) {
	let key = pubKey.encoded
	if (!options.prefixCaseSensitive) {
		key = key.toLowerCase()
	}
	return key.startsWith(options.prefix)
}

function generatePrivateKey() {
	let privKey
	do {
		privKey = crypto.randomBytes(32)
	} while (!secp256k1.privateKeyVerify(privKey))
	return privKey
}

function publicKey(privKey) {
	// apply ECDSA on private key
	// get the public key in a compressed format
	const pubKeyCompressed = secp256k1.publicKeyCreate(privKey)
	// Encrypting the public key
	// encrypted public key = RIPEMD160( SHA256(public key) )
	const pubKeySha256 = crypto.createHash('sha256').update(pubKeyCompressed).digest()
	const pubKeyRipemd160 = new RIPEMD160().update(pubKeySha256).digest()
	const pubKeyEncoded = btcAddress(pubKeyRipemd160, [0x0]) // TODO: implement 0x6f for testnet as well

	return {
		encoded: pubKeyEncoded,
		hex: buf2hex(pubKeyCompressed)
	}
}

function btcAddress(buffer, prefixByte) {
	// adding prefix
	const prefixedBuffer = Buffer.concat([new Uint8Array(prefixByte), buffer])
	// adding checksum to the last
	const prefixedBufferChecksum = Buffer.concat([prefixedBuffer, checkSum(prefixedBuffer)])
	// encode in base58
	return encode(prefixedBufferChecksum)
}

function checkSum(buffer) {
	// checksum = last 4 bytes of double sha256 of public key
	const bufferSha256 = crypto.createHash('sha256').update(buffer).digest()
	const bufferSha256Sha256 = crypto.createHash('sha256').update(bufferSha256).digest()
	return bufferSha256Sha256.slice(0, 4)
}

function encode(buff) {
	return '1'.repeat(leadingZeroCount(buff)) + base58Encode(BigInt('0x' + buff.toString('hex')))
}

function base58Encode(enc) {
	var alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
	var encoded = '';
	while (enc) {
		var remainder = enc % 58n;
		enc = enc / 58n;
		encoded = alphabet[remainder].toString() + encoded;
	}
	return encoded;
}

function leadingZeroCount(buff) {
	let cnt = 0
	for (let i = 0; i < buff.length; i++ , cnt++) {
		if (buff[i] != 0) break
	}
	return cnt
}

// https://stackoverflow.com/a/40031979/3559463
function buf2hex(buffer) { // buffer is an ArrayBuffer
	return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('').toUpperCase();
}

module.exports = {
	generate
}