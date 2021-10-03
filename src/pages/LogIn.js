import React from 'react'
import { useHistory } from 'react-router'
import useAuth from '../auth/useAuth'
import { routes } from '../routes'

export default function LogIn() {
    const auth = useAuth()
    const history=useHistory()
    const HandleLogin=()=>{
        auth.login()
        history.push(routes.home)
    }
    return (
        <div>
            <h1>Log In</h1>
            <button onClick={HandleLogin}>
                Sign In
            </button>
        </div>
    )
}
