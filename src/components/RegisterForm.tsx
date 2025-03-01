import axios from "axios";
import { useState } from "react";

export default function RegisterForm() {

    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        password_confirmation: "",
        token_name: ""
    })
    const [registeredNotification, setRegisteredNotification] = useState("")

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.post('https://unelmacloud.com/api/v1/auth/register', registerData, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(function(response) { if (response.data.status === 'success') {
        setRegisteredNotification('You was succesfully registered!')
         setTimeout(() => {
            setRegisteredNotification('')
        }, 5_000)
        setRegisterData({email: "", password: "", password_confirmation: "", token_name: ""});
        } else {
            setRegisteredNotification(`${response.data.message}`)
            setTimeout(() => {
               setRegisteredNotification('')
           }, 5_000)}});
    }

    return (
        <>
        <div className="registerForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required onChange={(e) => setRegisterData({...registerData, email: e.target.value, token_name: e.target.value})}></input>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" required onChange={(e) => setRegisterData({...registerData, password: e.target.value, password_confirmation: e.target.value})}></input>

                <button type="submit">Register</button>
            </form>
        </div>
        {registeredNotification && registeredNotification}
        </>
    )
}