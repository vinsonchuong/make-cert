import test from 'ava'
import path from 'path'
import {promises as fs} from 'fs'
import https from 'https'
import childProcess from 'child_process'
import {promisify} from 'util'
import got from 'got'
import tempy from 'tempy'

const exec = promisify(childProcess.exec)

test('making an SSL cert', async (t) => {
  const temporaryDir = tempy.directory()
  await exec(`yarn add file:${path.resolve()}`, {cwd: temporaryDir})
  await exec('yarn make-cert localhost', {cwd: temporaryDir})

  const key = await fs.readFile(path.join(temporaryDir, 'key.pem'), 'utf8')
  const cert = await fs.readFile(path.join(temporaryDir, 'cert.pem'), 'utf8')

  const server = https.createServer({key, cert}, (request, response) => {
    response.end('Hello World!')
  })
  await new Promise((resolve) => {
    server.listen(10001, resolve)
  })
  t.teardown(async () => {
    await new Promise((resolve) => {
      server.close(resolve)
    })
  })

  const response = await got('https://localhost:10001', {
    https: {rejectUnauthorized: false}
  })
  t.is(response.body, 'Hello World!')
})
