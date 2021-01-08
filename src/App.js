import authors from '../data/authors.csv'
import books from '../data/books.csv'
import magazines from '../data/magazines.csv'

function joinAuthors(collection, type, authors) {
  return collection.map(item => {
    const itemAuthorsEmails = item.authors.split(',')
    item.authors = itemAuthorsEmails.map(authorEmail =>
      authors.find(({ email }) =>
        email === authorEmail
      )
    )
    item.type = type
    return item
  })
}

function findItemByIsbn (collection, isbn) {
  return collection.find(item => item.isbn === isbn)
}

function findItemsByAuthorEmail (collection, authorEmail) {
  return collection.filter(({ authors }) => {
    return authors.findIndex(({ email }) => email === authorEmail) > -1
  })
}

function sortItemsByKey (collection, key, order = 'asc') {
  return collection.slice().sort((a, b) => {
    if (key === 'authors') {
      throw new Error(`key: ${key} is no supported`)
    } else {
      const aKey = a[key].toUpperCase()
      const bKey = b[key].toUpperCase()
      if (order === 'asc') {
        return aKey > bKey
      }
      return aKey < bKey
    }
  })
}

const Books = joinAuthors(books, 'book', authors)
const Magazines = joinAuthors(magazines, 'magazine', authors)
const AllItems = Books.concat(Magazines)
const App = () => {
  console.log('Step 1: print all items');
  console.log(AllItems)
  console.log('Step 2: find a book/magazine by the ISBN: 4545-8558-3232')
  console.log(findItemByIsbn(AllItems, '4545-8558-3232'))
  console.log('Step 3: find all books/magazines by the author email address: null-lieblich@echocat.org')
  console.log(findItemsByAuthorEmail(AllItems, 'null-lieblich@echocat.org'))
  console.log('Step 4: sort all items by title (in ascending order)')
  console.log(sortItemsByKey(AllItems, 'title', 'asc'))

};

export default App;
