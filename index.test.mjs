import test from 'ava'
import * as https from 'https'
import got from 'got'
import makeCert from './index.js'

test('making an SSL cert', async (t) => {
  const {key, cert} = makeCert('localhost')

  const server = https.createServer({key, cert}, (request, response) => {
    response.end('Hello World!')
  })
  await new Promise((resolve) => {
    server.listen(10000, resolve)
  })
  t.teardown(async () => {
    await new Promise((resolve) => {
      server.close(resolve)
    })
  })

  const response = await got('https://localhost:10000', {
    https: {rejectUnauthorized: false}
  })
  t.is(response.body, 'Hello World!')
})
