import React from 'react'
import authors from '../data/authors.csv'
import books from '../data/books.csv'
import magazines from '../data/magazines.csv'
import {
  joinAuthors,
  findItemByIsbn,
  findItemsByAuthorEmail,
  sortItemsByKey
} from './helper-methods'

const Books = joinAuthors(books, 'book', authors)
const Magazines = joinAuthors(magazines, 'magazine', authors)
const AllItems = Books.concat(Magazines)

const App = () => {
  console.log('Step 1: print all items but with author enriched and type of item explicit');
  console.log(AllItems)
  console.log('Step 2: find a book/magazine by the ISBN: 4545-8558-3232')
  console.log(findItemByIsbn(AllItems, '4545-8558-3232'))
  console.log('Step 3: find all books/magazines by the author email address: null-lieblich@echocat.org')
  console.log(findItemsByAuthorEmail(AllItems, 'null-lieblich@echocat.org'))
  console.log('Step 4: sort all items by title (in ascending order)')
  console.log(sortItemsByKey(AllItems, 'title', 'asc'))
  return <>
    <h1>Step 1: print all items but with some added data (i.e. full author info and item type)</h1>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Title</th>
          <th>Authors</th>
          <th>Description</th>
          <th>ISBN</th>
          <th>Publish Date</th>
        </tr>
      </thead>
      <tbody>
        {AllItems.map(item => {
          return <tr>
            <td>{item.type}</td>
            <td>{item.title}</td>
            <td>{item.authors.map(({ firstname, lastname }) => <div>
              {`${lastname}, ${firstname}`}
            </div>)}</td>
            <td>{item.description}</td>
            <td>{item.isbn}</td>
            <td>{item.publishedAt || ''}</td>
          </tr>
        })}
      </tbody>
    </table>
    
  </>
};

export default App;
