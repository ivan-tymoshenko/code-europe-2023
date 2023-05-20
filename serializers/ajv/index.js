import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const outputSchema = {
  properties: {
    books: {
      elements: {
        ref: 'bookSchema'
      },
    },
  },
  additionalProperties: false,
  definitions: {
    bookSchema: {
      properties: {
        id: { type: 'uint32' },
        title: { type: 'string' },
        pages: { type: 'uint32' },
        author: { ref: 'authorSchema' },
      },
      additionalProperties: false
    },
    authorSchema: {
      properties: {
        id: { type: 'uint32' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
      },
      additionalProperties: false
    }    
  }
}

const serialize = ajv.compileSerializer(outputSchema)
export default serialize
