import {gql} from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        author {
                name
               }
        id
        published
        title
        genres
    }
`

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
    query($genre: String){
        allBooks (genre: $genre){
            ...BookDetails
        }
    }
     ${BOOK_DETAILS}
`
export const LOGGED_IN_USER = gql`
    query{
        me {
            id
            favoriteGenre
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

export const LOGIN = gql`
    mutation Login ($username:String!,$password:String!){
        login(username: $username, password: $password)
        {
            value
        }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

