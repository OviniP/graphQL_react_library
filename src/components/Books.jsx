import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {

  const [genre, setGenre] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState([])
  const result = useQuery(ALL_BOOKS)

  if(result.loading)
  {
    return <div>Loading</div>
  }
  const books = result.data.allBooks
  if(filteredBooks.length === 0){
    setFilteredBooks(books)
  }
  
  const filterByGenre = (genre) => {
    const filtered = books.filter((book) => 
      book.genres.includes(genre)
    )
    setFilteredBooks(filtered)
    setGenre(genre)
  }

  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>
      {genre && <span>in genere <strong>{genre}</strong></span>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {
       books.flatMap(book => book.genres)
            .map((genre,index) => (
            <button key={index} onClick={() =>filterByGenre(genre)}>{genre}</button>
          ))
      }
      </div>
    </div>
  )
}

export default Books
