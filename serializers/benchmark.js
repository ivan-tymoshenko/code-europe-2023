import { join } from 'node:path'
import { Worker } from 'node:worker_threads'

import generateHistogram from './generate-histogram.js'

const __dirname = new URL('.', import.meta.url).pathname
const BENCH_THREAD_PATH = join(__dirname, './benchmark-suite.js')

const libNames = ['native', 'fast-json-stringify']

async function runBenchmark (libName) {
  const worker = new Worker(BENCH_THREAD_PATH, { workerData: { lib: libName } })

  return new Promise((resolve, reject) => {
    let result = null
    worker.on('error', reject)
    worker.on('message', (message) => {
      result = JSON.parse(message)
    })
    worker.on('exit', (code) => {
      if (code === 0) {
        resolve(result)
      } else {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

const histogramDataset = {}
for (const libName of libNames) {
  const { serializedResult, value } = await runBenchmark(libName)
  console.log(serializedResult)

  const label = libName === 'native' ? 'JSON.stringify' : libName
  histogramDataset[label] = value
}

await generateHistogram(histogramDataset)
