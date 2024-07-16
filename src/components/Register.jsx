import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import registerImage from "/register image.jpg"
import "../register.css";

export default function Register(){
    const [user, setUser] = useState(null)
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        cfmPassword: ""
    })
    
    const navigate = useNavigate();

    const handleChange = function (e){
        const {name, value} = e.target;
        setNewUser((prev)=> ({
            ...prev, [name] : value
        }))
        console.log("berubah");
    }

    const handleSubmit = async function(e) {
        e.preventDefault();
        const validationError = validate()
        if (Object.keys(validationError).length === 0) {
            try {
                console.log("coba posting");
                const submitResponse = await axios.post("http://localhost:4000/user", newUser)
                const createdUser = submitResponse.data
                setUser((prev)=>([
                    ...prev, createdUser
                ]))
                setNewUser({
                    username: "",
                    email: "",
                    phoneNumber: 0,
                    password: "",
                    cfmPassword: ""
                })
                alert("Registration successfull")
                navigate("/login")
            } catch (error) {
                console.log("Failed to post: ", error);
            }
        } else {
            console.log("masih ada error");
            console.log(errors);
            setErrors(validationError)
        }
    } 

    const [errors, setErrors] = useState({});
    const validate = function (){
        const errors = {};

        function validateName(){
            if (newUser.username == "") {
                errors.username = "Username is required"
            } else if (newUser.username.length < 5) {
                console.log("username less than 5");
                errors.username = "Username must be longer than 5 letter"
            }
        }

        function validateEmail(){
            if (newUser.email == "") {
                errors.email = "Email is required"
            } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
                errors.email = "Email is invalid"
            }
        }

        function validatePhoneNumber(){
            if (newUser.phoneNumber == "") {
                errors.phoneNumber = "Phone number is required"
            } else if (newUser.phoneNumber.length < 8 || newUser.phoneNumber.length > 12) {
                errors.phoneNumber = "Phone number must be between [8-12] digit"
            }
        }

        function validatePassword(){
            if (newUser.password == "") {
                errors.password = "Password is required"
            } else if (newUser.password.length < 6) {
                errors.password = "Password must be more than 6 digit"
            }
        }

        function cfmPassword() {
            if (newUser.password !== newUser.cfmPassword) {
                errors.cfmPassword = "Password do not match"
            }
        }

        validateEmail()
        validateName()
        validatePhoneNumber()
        validatePassword()
        cfmPassword()

        return errors;
    }


    function navigateToLogin() {
        navigate("/login")
    }

    return (
        <div className="register__container">
            <div className="register__image">
                <img src={registerImage} alt="" />
            </div>
            <div className="register__right-form">
                <div className="register__title">
                    <h1>Hi, Welcome to</h1>
                    <h1 className="register__title-DnFOutfit">DnF Outfits</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input__container">
                        <Form
                            htmlFor={"username"}
                            label={"Username"}
                            type={"text"}
                            name={"username"}
                            placeholder={"Enter username"}
                            onChange={handleChange}
                            id={"username"}
                            errors={errors.username}
                        />
                        <Form
                            htmlFor={"email"}
                            label={"Email"}
                            type={"text"}
                            name={"email"}
                            placeholder={"Enter email"}
                            onChange={handleChange}
                            id={"email"}
                            errors={errors.email}
                        />
                        <Form
                            htmlFor={"phoneNumber"}
                            label={"Phone Number"}
                            type={"number"}
                            name={"phoneNumber"}
                            placeholder={"Enter phone number"}
                            onChange={handleChange}
                            id={"phoneNumber"}
                            errors={errors.phoneNumber}
                        />
                        <Form
                            htmlFor={"password"}
                            label={"Password"}
                            type={"password"}
                            name={"password"}
                            placeholder={"Enter password"}
                            onChange={handleChange}
                            id={"password"}
                            errors={errors.password}
                        />
                        <Form
                            htmlFor={"cfmPassword"}
                            label={"Confirm Password"}
                            type={"password"}
                            name={"cfmPassword"}
                            placeholder={"Enter confirm password"}
                            onChange={handleChange}
                            id={"cfmPassword"}
                            errors={errors.cfmPassword}
                        />
                    </div>
                    <button className="register__btn" type="submit">Register</button>
                </form>
                <div className="login__redirect">
                    Got an account?
                    <p onClick={navigateToLogin}><b>Click here</b></p>
                </div>
            </div>
        </div>
    )
}