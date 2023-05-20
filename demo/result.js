'use strict'

const fastify = require('fastify')

const app = fastify()

app.register(require('@fastify/swagger'))
app.register(require('@fastify/swagger-ui'))

const books = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    pages: 281
  },
  {
    id: 2,
    title: '1984',
    pages: 328
  }
]

app.addSchema({
  $id: 'book',
  type: 'object',
  properties: {
    id: { type: 'integer', minimum: 0 },
    title: { type: 'string', minLength: 1 },
    pages: { type: 'integer', minimum: 1 }
  },
  required: ['id', 'title', 'pages'],
  additionalProperties: false
})

app.register(async (app) => {
  app.get('/books/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: app.getSchema('book').properties.id
        }
      },
      response: {
        200: app.getSchema('book'),
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const bookId = parseInt(request.params.id)
    const book = books.find(book => book.id === bookId)

    if (book === undefined) {
      reply.statusCode = 404
      return { error: 'Book not found' }
    }

    return book
  })
})

app.listen({ port: 3042 }, (err, address) => {
  if (err) throw err
  console.log(`server listening on ${address}`)
})
