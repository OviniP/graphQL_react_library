import { useState,useEffect } from "react"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"

const Login = (props) =>{

    const [username, setUsername]= useState('')
    const [password, setPassword] = useState('')

    const [error,setError] = useState('')

    const [login, result] = useMutation(LOGIN,{
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
          }
    })

    useEffect(() => {
        if(result?.data){
            const token = result.data.login.value
            props.login(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data])

    const loginSubmit = async (event) => {
        event.preventDefault()
        login({
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