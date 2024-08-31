import { useQuery } from '@apollo/client'
import { ALL_BOOKS, LOGGED_IN_USER } from "../queries"
import {useEffect} from "react"

const Recommend = (props) => {

    const userResult = useQuery(LOGGED_IN_USER)
    const { data, loading, refetch } = useQuery(ALL_BOOKS, {
        variables: { genre: userResult.data?.me?.favoriteGenre },
        skip: !userResult?.data?.me?.favoriteGenre, // Skip if favoriteGenre is not available
    });
    
    useEffect(() => {
        if (userResult.data?.me?.favoriteGenre) {
            refetch({ genre: userResult.data.me.favoriteGenre });
        }
      }, [userResult.data?.me, refetch]);
    
    if(!props.show)
        return null
    if(loading || userResult.loading)
        {
          return <div>Loading</div>
        }
    const books = data?.allBooks
    const user = userResult.data?.me
    console.log(user)

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
                {books?.map((a) => (
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