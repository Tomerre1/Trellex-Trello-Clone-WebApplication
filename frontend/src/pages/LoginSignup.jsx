import React,{useState} from 'react'

export  function LoginSignup() {

    const [username,setUsername] = useState('')
    const [password,setPassword]  = useState('')
    return (
        <div className="login-page main-layout">
            <h1>Login</h1>
            <form>
                <label></label>
                <input type="txt" value={username} onChange={(ev)=>setUsername}/>
                <label></label>
                <input type="password" value={password} onChange={(ev)=>setPassword}/>
          
            </form>
        </div>
    )
}
