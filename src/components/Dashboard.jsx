import axios from "axios";
import { useEffect, useState } from "react";
import "../dashboard.css"
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import salesGraph from "/dashboard graphic.png"
import salesGraph2 from "/dashboard 2.png"
import salesGraph3 from "/dashboard 3.png"

export default function Dashboard(){
    const [user, setUser] = useState([]);
    const [products, setProducts] = useState([])
    const [newProducts, setNewProducts] = useState({
        title: "",
        price: 0,
        rating: {rate: 0},
        reviewers: 0,
        image: ""
    })
    const [showForm, setShowForm] = useState(false)
    const navigate = useNavigate()

    useEffect(function(){
        async function getUser(){
            const readResponse = await axios.get("http://localhost:4000/user")
            console.log(readResponse);
            setUser(readResponse.data)
        }
        getUser();
    }, [])

    const handleSubmit = async function postData(e){
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/product", newProducts)
            const createdProduct = response.data
            setProducts((prev)=>
                [...prev, createdProduct]
            )
            setNewProducts({
                title: "",
                price: 0,
                rating: {rate: 0},
                reviewers: 0,
                image: ""
            })
            setShowForm(false)
        } catch (error) {
            console.log("Post product failed: ", error);
        }
    }

    const handleChange = function (e) {
        const {name, value} = e.target
        if (name === "rate") {
            setNewProducts((prev)=>({
                ...prev, rating: {...prev.rating, rate: value}
            }))
            console.log("Ini input rate");
        } else {
            setNewProducts((prev)=>({
                ...prev, [name] : value,
            }))
            console.log("Ini bukan input rate")
        }
    }

    const createButtonClick = function () {
        setShowForm(true)
    }

    return (
        <div className="dashboard__container">
            <div className="dashboard__top">
                <div className="dashboard__title">
                    <h4>Welcome back, Dave</h4>
                    <h1>Dashboard Overview</h1>
                </div>
                <div className="dashboard__button">
                    <button onClick={createButtonClick}>Create a product</button>
                </div>
            </div>
            <div className="dashboard__middle">
                <div id="dashboard__sales" className="dashboard__card">
                    <h3>Total sales</h3>
                    <div className="dashboard__sales-number">
                        <h1>Rp300,000,00 <i className="fa-solid fa-arrow-right"></i></h1> <h2>10%</h2>
                    </div>
                    <h3>This month (July 2024)</h3>
                    <img src={salesGraph3} alt="" />
                </div>
                <div id="dashboard__best-seller" className="dashboard__card">
                    <h3>Best Seller Product</h3>
                    <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" alt="" />
                </div>
                <div className="dashboard__card" id="dashboard__least-seller">
                    <h3>Least Seller Product</h3>
                    <img src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" alt="" />
                </div>
            </div>
            <div className="dashboard__bottom">
                <div id="dashboard__users" className="dashboard__card">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map(function(user){
                                return (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="dashboard__card" id="sales__graph">
                    <img src={salesGraph} alt="" />
                </div>
                <div className="dashboard__card" id="sales__graph">
                    <img src={salesGraph2} alt="" />
                </div>
            </div>

            {showForm? 
                <div id="dashboard__create-product">
                <form onSubmit={handleSubmit}>
                    <Form
                        htmlFor={"title"}
                        label={"Product name"}
                        type={"text"}
                        name={"title"}
                        placeholder={"Enter product title..."}
                        onChange={handleChange}
                        id={"title"}
                        errors={""}
                    />
                    <Form
                        htmlFor={"price"}
                        label={"Product price"}
                        type={"number"}
                        name={"price"}
                        placeholder={"Enter product price..."}
                        onChange={handleChange}
                        id={"price"}
                        errors={""}
                    />
                    <Form
                        htmlFor={"rate"}
                        label={"Product rating"}
                        type={"number"}
                        name={"rate"}
                        placeholder={"Enter product rating..."}
                        onChange={handleChange}
                        id={"rate"}
                        errors={""}
                        steps={"0.01"}
                    />
                    <Form
                        htmlFor={"image"}
                        label={"Product image url"}
                        type={"text"}
                        name={"image"}
                        placeholder={"Enter product image..."}
                        onChange={handleChange}
                        id={"image"}
                        errors={""}
                    />
                    <Form
                        htmlFor={"reviewers"}
                        label={"Reviewers"}
                        type={"text"}
                        name={"reviewers"}
                        placeholder={"Enter number of reviewers..."}
                        onChange={handleChange}
                        id={"reviewers"}
                        errors={""}
                    />
                    <button type="submit">Create Product</button>
                </form>
            </div> : ""
            }
            
            
            <div id="dashboard__edit-product" className="dashboard__card">

            </div>
            {showForm? <div className="blackscreen"></div> : "" }
            
        </div>
    )
}