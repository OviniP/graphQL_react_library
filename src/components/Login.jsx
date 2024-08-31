import { useState,useEffect } from "react"
import { LOGIN , LOGGED_IN_USER} from "../queries"
import { useMutation, useQuery } from "@apollo/client"

const Login = (props) =>{

    const [username, setUsername]= useState('')
    const [password, setPassword] = useState('')

    const { refetch } = useQuery(LOGGED_IN_USER);
    const [login, result] = useMutation(LOGIN,{
        onError: (error) => {
            console.log('login error', error.graphQLErrors[0].message)
          }, 
          onCompleted: (data) => {
            localStorage.setItem('library-user-token', data.login.value)
            refetch(); // Manually refetch the LOGGED_IN_USER query
          },
          //refetchQueries:[{ query: LOGGED_IN_USER } ]
    })
    
    useEffect(() => {
        if(result?.data){
            const token = result.data.login.value
            props.login(token)
        }
    }, [result.data])

    const loginSubmit = async (event) => {
        event.preventDefault()
        await login({
            variables:{
                username:username,
                password:password
            }
        })
    }

    if(props.show){
        return(
            <form onSubmit={loginSubmit}>
                <h3>Login</h3>

                <div>User Name : <input type="text" onChange={({target}) => setUsername(target.value)}></input></div>
                <div>Password : <input type="password" onChange={({target}) => setPassword(target.value)}></input></div>
                <div><button>Login</button></div>
            </form>
        )
    }

}

export default Login