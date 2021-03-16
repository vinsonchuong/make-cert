const forge = require('node-forge')

module.exports = function (hostName) {
  const keys = forge.pki.rsa.generateKeyPair(2048)

  const cert = forge.pki.createCertificate()
  cert.publicKey = keys.publicKey
  cert.serialNumber = '01'
  cert.validity.notBefore = new Date()
  {
    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    cert.validity.notAfter = expirationDate
  }

  {
    const attrs = [
      {name: 'commonName', value: hostName},
      {name: 'countryName', value: 'US'},
      {shortName: 'ST', value: 'California'},
      {name: 'localityName', value: 'Berkeley'},
      {name: 'organizationName', value: 'Test'},
      {shortName: 'OU', value: 'Test'}
    ]
    cert.setSubject(attrs)
    cert.setIssuer(attrs)
  }

  cert.sign(keys.privateKey)

  return {
    cert: forge.pki.certificateToPem(cert),
    key: forge.pki.privateKeyToPem(keys.privateKey)
  }
}
