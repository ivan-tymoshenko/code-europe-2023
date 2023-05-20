import { object, string, number, array } from 'yup';

const authorSchema = object({
  id: number().positive().required(),
  firstName: string().required(),
  lastName: string().required()
})

const bookSchema = object({
  id: number().positive().required(),
  title: string().required(),
  pages: number().positive().required(),
  author: authorSchema
})

const inputSchema = object({
  books: array(bookSchema).required()
})

export default (input) => {
  return inputSchema.validateSync(input);
}
