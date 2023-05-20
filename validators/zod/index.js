import z from 'zod'

const authorSchema = z.object({
  id: z.number().positive(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty()
})

const bookSchema = z.object({
  id: z.number().positive(),
  title: z.string().nonempty(),
  pages: z.number().positive(),
  author: authorSchema
})

const inputSchema = z.object({
  books: z.array(bookSchema)
})

export default (input) => {
  return inputSchema.parse(input);
}
