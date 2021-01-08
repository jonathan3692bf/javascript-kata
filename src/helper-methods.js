
export function joinAuthors(collection = [], type = '', authors = []) {
  return collection.slice().map(oldItem => {
    const newItem = Object.assign({}, oldItem)
    const itemAuthorsEmails = newItem.authors.split(',')
    newItem.authors = itemAuthorsEmails.map(authorEmail =>
      authors.find(({ email }) =>
        email === authorEmail
      )
    )
    newItem.type = type
    return newItem
  })
}

export function findItemByIsbn (collection = [], isbn = '') {
  return collection.find(item => item.isbn === isbn)
}

export function findItemsByAuthorEmail (collection = [], authorEmail = '') {
  return collection.filter(({ authors }) => {
    return authors.findIndex(({ email }) => email === authorEmail) > -1
  })
}

export function sortItemsByKey (collection = [], key, order = 'asc') {
  return collection.slice().sort((a, b) => {
    if (key === 'authors') {
      throw new Error(`key: ${key} is no supported`)
    }
    else {
      const aKey = a[key].toUpperCase()
      const bKey = b[key].toUpperCase()
      if (order === 'asc') {
        return aKey > bKey
      }
      return aKey < bKey
    }
  })
}
