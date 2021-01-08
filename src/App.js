import React, { useState } from 'react'
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
  const [authorEmail, setAuthorEmail] = useState('null-lieblich@echocat.org')
  const [searchResults, setSearchResults] = useState(findItemsByAuthorEmail(AllItems, 'null-lieblich@echocat.org'))
  console.log('Step 1: print all items but with author enriched and type of item explicit');
  console.log(AllItems)
  console.log('Step 2: find a book/magazine by the ISBN: 4545-8558-3232')
  console.log(findItemByIsbn(AllItems, '4545-8558-3232'))
  console.log('Step 3: find all books/magazines by the author email address: null-lieblich@echocat.org')
  console.log(findItemsByAuthorEmail(AllItems, 'null-lieblich@echocat.org'))
  console.log('Step 4: sort all items by title (in ascending order)')
  console.log(sortItemsByKey(AllItems, 'title', 'asc'))

  function handleChange (evt) {
    setAuthorEmail(evt.target.value)
    setSearchResults(findItemsByAuthorEmail(AllItems, evt.target.value))
  }

  function handleClick () {
    setAuthorEmail('')
    setSearchResults(AllItems)
  }
  return <div style={{ padding: '2rem' }}>
    <h2 style={{ textAlign: 'center' }}>See <code>console log</code> for steps 1, 2, 3, 4</h2> 
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <h3 style={{ marginRight: '1rem' }}>Step 3: find all books/magazines by the author email address:</h3>
    <input value={authorEmail} onChange={handleChange} style={{ width: 200, marginRight: '1rem' }}/>
    <button onClick={handleClick}>
      Clear results
    </button>
    </div>
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
        {searchResults.map(item => {
          return <tr key={item.isbn}>
            <td>{item.type}</td>
            <td>{item.title}</td>
            <td>{item.authors.map(({ firstname, lastname }) => <div key={lastname}>
              {`${lastname}, ${firstname}`}
            </div>)}</td>
            <td>{item.description}</td>
            <td>{item.isbn}</td>
            <td>{item.publishedAt || ''}</td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
};

export default App;
