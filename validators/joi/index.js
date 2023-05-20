import Joi from 'joi'

const authorSchema = Joi.object({
  id: Joi.number().positive().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
})

const bookSchema = Joi.object({
  id: Joi.number().positive().required(),
  title: Joi.string().required(),
  pages: Joi.number().positive().required(),
  authorSchema: authorSchema
})

const inputSchema = Joi.object({
  books: Joi.array().items(bookSchema).required()
})

export default (input) => {
  return inputSchema.validate(input)
}
