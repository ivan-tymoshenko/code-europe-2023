import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { workerData, parentPort } from 'node:worker_threads'

import deepEqual from 'fast-deep-equal'
import Benchmark from 'benchmark'

const { default: serialize } = await import(`./${workerData.lib}/index.js`)

Benchmark.options.minSamples = 350
const suite = Benchmark.Suite()

const __dirname = new URL('.', import.meta.url).pathname
const PATH_TO_INPUT_DATA = join(__dirname, 'books.json')

const outputData = await readFile(PATH_TO_INPUT_DATA, 'utf8')
const parsedOutputData = JSON.parse(outputData)

const serializedData = await serialize(parsedOutputData)

const isDataValid = deepEqual(JSON.parse(serializedData), parsedOutputData)
if (!isDataValid) {
  throw new Error('Input data is not valid')
}

suite
  .add(workerData.lib, () => {
    serialize(parsedOutputData)
  })
  .on('cycle', (event) => {
    const massage = JSON.stringify({
      value: Math.round(event.target.hz),
      serializedResult: String(event.target)
    })
    parentPort.postMessage(massage)
  })
  .on('complete', () => {})
  .run()
