import 'reflect-metadata'
import { plainToInstance, Transform, Type } from 'class-transformer'
import {
  validate,
  IsDefined,
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

class Author {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

class Book {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  pages: number;

  @IsDefined()
  @ValidateNested()
  author: Author;
}

class Input {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => Book)
  books: Book[];
}

export default async (input: unknown): Promise<boolean> => {
  const errors = await validate(plainToInstance(Input, input))
  return errors.length === 0
}
