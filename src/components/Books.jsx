import {  useEffect, useState } from "react"
import {ALL_BOOKS} from "../queries"
import {useQuery} from "@apollo/client"

const Books = ({show,books}) => {

  const [genre, setGenre] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState(books)
  const { filteredData, loading, error, previousData } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
    onCompleted: (data) => {
      setFilteredBooks(data.allBooks); 
    },
  })

  /*useEffect(()=>{
    if(filteredData)
    {
      setFilteredBooks(filteredData)
    }
    else{
       setFilteredBooks(books)
    }
  },[books, genre, filteredData])*/

  if (!show) {
    return null
  }
  if(loading)
  {
    return <div>Loading</div>
  }
 /*
  const filterByGenre = (genre) => {
    const filtered = books.filter((book) => 
      book.genres.includes(genre)
    )
    setFilteredBooks(filtered)
  }
 */
  const uniqueGenres = Array.from(
    new Set(books.flatMap((book) => book.genres))
  );



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
          uniqueGenres.map((genre,index) => (
            <button key={index} onClick={() => setGenre(genre)}>{genre}</button>
          ))
      }
      </div>
    </div>
  )
}

export default Books
