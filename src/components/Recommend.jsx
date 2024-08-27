import { useQuery } from "@apollo/client"
import { ALL_BOOKS, LOGGEDIN_USER } from "../queries"

const Recommend = (props) => {

    const token = localStorage.getItem('library-user-token')
    const userResult = useQuery(LOGGEDIN_USER)
    const result = useQuery(ALL_BOOKS)
    
    if(!props.show)
        return null
    if(result.loading || userResult.loading)
        {
          return <div>Loading</div>
        }
    const books = result.data.allBooks
    const user = userResult.data?.me

    return (
        <>
            <h2>Recommendations</h2>
            <div>Books in your favourite genre <strong>{user?.favoriteGenre}</strong></div>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.map((a) => (
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default Recommend