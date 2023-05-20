var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import 'reflect-metadata';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { validate, IsDefined, IsNumber, IsPositive, IsString, IsNotEmpty, ValidateNested, } from 'class-validator';
class Author {
    id;
    firstName;
    lastName;
}
__decorate([
    IsNumber(),
    IsPositive()
], Author.prototype, "id", void 0);
__decorate([
    IsString(),
    IsNotEmpty()
], Author.prototype, "firstName", void 0);
__decorate([
    IsString(),
    IsNotEmpty()
], Author.prototype, "lastName", void 0);
class Book {
    id;
    title;
    pages;
    author;
}
__decorate([
    IsNumber(),
    IsPositive()
], Book.prototype, "id", void 0);
__decorate([
    IsString(),
    IsNotEmpty()
], Book.prototype, "title", void 0);
__decorate([
    IsNumber(),
    IsPositive()
], Book.prototype, "pages", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Transform(({ value }) => plainToInstance(Author, value))
], Book.prototype, "author", void 0);
class Input {
    books;
}
__decorate([
    IsDefined(),
    ValidateNested({ each: true }),
    Type(() => Book)
], Input.prototype, "books", void 0);
export default async (input) => {
    const errors = await validate(plainToInstance(Input, input));
    return errors.length === 0;
};
