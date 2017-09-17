import { expect, tap } from 'tapbundle'
import * as docean from '../ts/index'

tap.test('first test', async () => {
  console.log(docean.standardExport)
})

tap.start()
