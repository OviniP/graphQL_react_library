import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            bookCount
            name
            born
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query{
        allBooks {
            author
            id
            published
            title
        }
    }

`

export const ADD_BOOK = gql`
    mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
        addBook(title: $title, published: $published, author: $author, genres: $genres) {
            id
  }
}
`

export const Edit_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
         id
    }
}
`