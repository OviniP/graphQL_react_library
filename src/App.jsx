import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import {  useApolloClient } from '@apollo/client'
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = (event) => {
    event.preventDefault()
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const login = (token) =>{
    setToken(token)
    setPage('authors')
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
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} />
      <Login show={page === "login"} login = {login}/>
    </div>
  );
};

export default App;
