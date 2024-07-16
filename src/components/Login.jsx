import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Form from "./Form"
import "../login.css"
import loginImage from "/register image.jpg"

export default function Login() {
    const [loginUser, setloginUser] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({})
    const navigate = useNavigate()

    const handleChange = function (e){
        const {name, value} = e.target
        setloginUser((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = async function(e) {
        const error = {}
        e.preventDefault()
        if (loginUser.email == "" || loginUser.email == null) {
            error.email = "Please enter an email"
            console.log(error);
        } else if (loginUser.password === "" || loginUser.password === null) {
            console.log("password empty");
            error.password = "Please enter an password"
        } else {
            try {
                const response = await axios.get("http://localhost:4000/user")
                const users = response.data
                const userFound = users.find(user => user.email === loginUser.email && user.password === loginUser.password)
    
                if (userFound) {
                    navigate("/")   
                } else {
                    alert("Email / password do not match")
                    console.log(error);
                }
            } catch (error) {
                console.log("Failed to login: ", error);
            }
        }
    }
    return (
        <div className="container">
            <div className="redirect__home">
                <a href="/">Back to home</a>
            </div>
            <div className="form__container">
                <h2>DnF Outfits</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <Form
                        htmlFor = {"email"}
                        label={"Email"}
                        type = {"text"}
                        name={"email"}
                        placeholder={"Enter email"}
                        onChange={handleChange}
                        id={"email"}
                        errors={error.email}
                    />
                    <Form
                        htmlFor = {"password"}
                        label={"Password"}
                        type = {"password"}
                        name={"password"}
                        placeholder={"Enter password"}
                        onChange={handleChange}
                        id={"password"}
                        errors={error.password}
                    />
                    <button className="login__button" type="submit">Login</button>
                    <a href="/register">Create a new account!</a>
                </form>
            </div>
            <div className="image__container">
                <img src={loginImage} alt="" />
            </div>
        </div>
        
    )
}