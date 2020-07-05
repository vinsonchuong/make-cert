# make-cert
[![npm](https://img.shields.io/npm/v/make-cert.svg)](https://www.npmjs.com/package/make-cert)
[![CI Status](https://github.com/vinsonchuong/make-cert/workflows/CI/badge.svg)](https://github.com/vinsonchuong/make-cert/actions?query=workflow%3ACI)
[![dependencies Status](https://david-dm.org/vinsonchuong/make-cert/status.svg)](https://david-dm.org/vinsonchuong/make-cert)
[![devDependencies Status](https://david-dm.org/vinsonchuong/make-cert/dev-status.svg)](https://david-dm.org/vinsonchuong/make-cert?type=dev)

Quickly generate a self-signed cert to start an HTTPS server

## Usage
Install [make-cert](https://www.npmjs.com/package/make-cert)
by running:

```sh
yarn add make-cert
```

To generate a `key.pem` with the private key and `cert.pem` with the
certificate, both in PEM format, run:

```sh
yarn make-cert localhost
```

To use this in your own JavaScript code:
```js
import makeCert from 'make-cert'

const {key, cert} = makeCert('localhost')
console.log(key)
console.log(cert)
```
