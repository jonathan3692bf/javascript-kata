import { authors, books } from './fixtures'
import {
  joinAuthors,
  // findItemByIsbn,
  // findItemsByAuthorEmail,
  // sortItemsByKey
} from '../helper-methods';

describe('joinAuthors()', () => {
  const type = 'book'
  const Books = joinAuthors(books, type, authors)
  test('should return an array', () => {
    expect(Array.isArray(Books)).toBe(true);
  })
  test('should annotate the collection item with "type"', () => {
    Books.forEach(book => {
      expect(book.type).toBe(type)
    })
  })
  test('should map "authors" from String to Object ', () => {
    Books.forEach(book => {
      book.authors.forEach(author => {
        expect(author).toEqual(expect.objectContaining({
          email: expect.any(String),
          firstname: expect.any(String),
          lastname: expect.any(String)
        }))
      })
    })
  })
})
