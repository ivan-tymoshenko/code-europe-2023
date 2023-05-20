import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

import fjs from 'fast-json-stringify'
import Benchmark from 'benchmark'

const authorSchema = {
  type: 'object',
  properties: {
    id: { type: 'number', minimum: 1 },
    firstName: { type: 'string', minLength: 1 },
    lastName: { type: 'string', minLength: 1 },
  },
  additionalProperties: false,
  required: ['id', 'firstName', 'lastName']
}

const bookSchema = {
  type: 'object',
  properties: {
    id: { type: 'number', minimum: 1 },
    title: { type: 'string', minLength: 1 },
    pages: { type: 'number', minimum: 1 },
    author: authorSchema,
  },
  additionalProperties: false,
  required: ['id', 'title', 'pages', 'author']
}

const outputSchema = {
  type: 'object',
  properties: {
    books: {
      type: 'array',
      items: bookSchema,
    },
  },
  additionalProperties: false,
  required: ['books']
}

const serialize = fjs(outputSchema, { schema: [authorSchema, bookSchema] })

Benchmark.options.minSamples = 200
const suite = Benchmark.Suite()

const __dirname = new URL('.', import.meta.url).pathname
const PATH_TO_INPUT_DATA = join(__dirname, 'books.json')

const outputData = await readFile(PATH_TO_INPUT_DATA, 'utf8')
const parsedOutputData = JSON.parse(outputData)

let i = 0
suite
  .add('fast-json-stringify', () => {
    serialize(parsedOutputData)
  })
  .on('cycle', (event) => {
    const massage = JSON.stringify({
      value: Math.round(event.target.hz),
      serializedResult: String(event.target)
    })
    console.log(massage)
  })
  .on('complete', () => {})
  .run()
