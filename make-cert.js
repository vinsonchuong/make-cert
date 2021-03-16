#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const makeCert = require('./index.js')

const hostName = process.argv[2]
if (hostName) {
  const {key, cert} = makeCert(hostName)
  fs.writeFileSync(path.resolve('key.pem'), key)
  fs.writeFileSync(path.resolve('cert.pem'), cert)
  console.log('key.pem and cert.pem written to the current directory')
} else {
  console.log('Usage: make-cert HOSTNAME')
}
