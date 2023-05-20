import fjs from 'fast-json-stringify'

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

const serialize = fjs(outputSchema)
export default serialize
