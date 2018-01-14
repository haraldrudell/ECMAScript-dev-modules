/*
© 2017-present Harald Rudell <harald.rudell@gmail.com> (http://www.haraldrudell.com)
This source code is licensed under the ISC-style license found in the LICENSE file in the root directory of this source tree.
*/
import pjson from '../package.json'
import {spawnCapture} from 'asy-spawn'

import fs from 'fs-extra'

import path from 'path'

const cleanKey = getNonEmptyString(Object(Object(pjson).bin).clean, 'package.json: bin.clean')
const cleanExecutable = path.resolve(cleanKey)

function getNonEmptyString(value, m) {
  const t = typeof value
  if (t !== 'string' || !value) throw new Error(`${m}: not non-empty string: ${t}`)
  return value
}

test('yarn build should have completed', async () => {
  if (!await fs.pathExists(cleanExecutable)) throw new Error(`Executable missing, yarn build did not complete: ${cleanExecutable}`)
})

test('clean executable runs', async () => {
  const {stdout} = await spawnCapture(cleanExecutable, ['-debug', 'xyz'], {stderrFails: true})
  console.log('YES', stdout, '<')
})
