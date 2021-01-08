import authors from '../data/authors.csv'
import books from '../data/books.csv'
import magazines from '../data/magazines.csv'

function joinAuthors(collection, authors) {
  return collection.map(item => {
    const itemAuthorsEmails = item.authors.split(',')
    item.authors = itemAuthorsEmails.map(authorEmail =>
      authors.find(({ email }) =>
        email === authorEmail
      )
    )
    return item
  })
}

const App = () => {
  console.log('Step 1: print all items');
  console.log(joinAuthors(books.concat(magazines), authors))
};

export default App;
