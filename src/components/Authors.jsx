import { useMutation, useQuery } from "@apollo/client"
import {ALL_AUTHORS, Edit_AUTHOR} from '../queries'
import { useState } from "react"

const Authors = (props) => {

  const [name, setName] = useState("")
  const [year, setYear] = useState("")
  const token = localStorage.getItem('library-user-token')

  const result = useQuery(ALL_AUTHORS)
  
  const [editAuthor] = useMutation(Edit_AUTHOR,{
    refetchQueries: [{query:ALL_AUTHORS}]
  })

  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>Loading...</div>
  }
  const authors = result.data.allAuthors

  const setBirthYear = async (event) => {
    event.preventDefault()
    editAuthor({
      variables:{
        name:name,
        setBornTo:Number(year)
      }
    })
    console.log(year, name)
  }

  return (
    <div>
      <div>      
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {token && <div>
        <h2>Set birth year</h2>
        <form onSubmit={setBirthYear}>
            <div>
              Name
              {
                <select  onChange={(event => setName(event.target.value))}>
                  {authors.map((author) => ( <option key={author.id} value={author.name}> {author.name} </option> ))}
                </select>
              }
            </div>
            <div>
              Born
              <input onChange={ ({target}) => setYear(target.value) }></input>
            </div>
            <button>Update Author</button>
        </form>
      </div>}
    </div>
  )
}

export default Authors
