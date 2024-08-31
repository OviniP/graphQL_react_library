import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import {  useApolloClient, useSubscription, useQuery  } from '@apollo/client'
import Recommend from "./components/Recommend";
import { BOOK_ADDED,ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

    const logout = (event) => {
    event.preventDefault()
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const login = (token) =>{
    setToken(token)
    setPage('authors')
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data , client}) => {
      const newBook = data.data.bookAdded
      //window.alert(`new book added ${newBook.title}`)

      updateCache(client.cache, { query: ALL_BOOKS }, newBook)

    }
  })

 const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery({
    query: ALL_BOOKS,
    variables: { genre: addedBook.genre }, // Update cache with this genre
  },
    ({ allBooks }) => {
    const books = uniqByName(allBooks.concat(addedBook))
    return {
      allBooks: books,
    }
  })
}
  if(result.loading)
  {
    return <div>Loading</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && <button onClick={() => setPage("recommend")}>Recommended</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} books={result.data.allBooks}/>
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} />
      <Login show={page === "login"} login = {login}/>
    </div>
  );
};

export default App;
