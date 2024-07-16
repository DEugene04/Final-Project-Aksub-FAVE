import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'animate.css';
import ScrollAnimation from './ScrollAnimation'; // Import the ScrollAnimation component
import '../home.css'; // Make sure your CSS file is correctly imported

import userIcon from '/snail.jpg';
import promoPhoto from '/homepage promo photo.png';
import SwipeButton from './SwipeButton';
import suit from '/suit.webp';
import shirt from '/shirt.jpg';
import underwear from '/underwear.jpeg';
import dress from '/dress.webp';
import Card from './Card';

export default function Home() {
    const [products, setProducts] = useState([])
    const [cartProducts, setCartProducts] = useState([])

    useEffect(function(){
        async function getData(){
            const response = await axios.get("http://localhost:3000/product")
            console.log(response.data);
            setProducts(response.data)
        }
        getData()
    }, [])

    const navigate = useNavigate();

    const redirectEditProduct = function (id) {
        navigate(`/edit/${id}`)
    }

    const handleDelete = async function(id) {
        try {
            const deleteResponse = await axios.delete(`http://localhost:3000/product/${id}`)
            setProducts((prev)=>prev.filter((products) => products.id !== id))
        } catch (error) {
            console.log("Delete failed: ", error);
        }
    }

    const addToCart = function (id) {
        const findProduct = products.find(product => product.id === id)
        console.log("ini yang di add ke cart", findProduct);
    }


    return (
        <div className="main__container">
            <nav className="navbar__container">
                <div className="navbar__top">
                    <div className="navbar__top-left">
                        <div className="account__image">
                            <img src={userIcon} alt="" />
                        </div>
                    </div>
                    <div className="navbar__top-middle">
                        <p>Home</p>
                        <p>Shop</p>
                        <p>About us</p>
                        <p>Contact</p>
                    </div>
                    <div className="navbar__top-right">
                        {/* bedain kalau ud login dan belum */}
                        <button className="signup__button">Sign Up</button>
                        <button className="signin__button">Sign In</button>
                        <div className="account__setting">
                        </div>
                        
                        {/* <div className="search-bar">
                            <input type="text" placeholder="search" />
                        </div> */}
                        {/* <div className="account__profile">
                            <img src={suit} alt="" />
                        </div> */}
                    </div>
                </div>
            </nav>
            <hr />
            <div className="promo-photo__container">
                <div className="promo-photo__image">
                    <img src={promoPhoto} alt="" />
                </div>
            </div>
            <div className="category__container">
                <div className="category__title">
                    Category
                </div>
                <div className="choice__container">
                    <ScrollAnimation 
                        animationName="slideInLeft"
                    >
                    <div className="choice">
                        <img src={dress} alt="" />
                        <p>Dress</p>
                    </div>
                    <div className="choice">
                        <img src={suit} alt="" />
                        <p>Suit</p>
                    </div>
                    </ScrollAnimation>

                    <ScrollAnimation animationName="slideInRight">
                        <div className="choice">
                            <img src={underwear} alt="" />
                            <p>Underwear</p>
                        </div>
                        <div className="choice">
                            <img src={shirt} alt="" />
                            <p>Shirt</p>
                        </div>
                    </ScrollAnimation>

                </div>
            </div>
            <div className="products__page">
                <div className="recommended__product">
                    <h1>Recomended for you</h1>
                    <div className="recommended__card">
                        {products.map(function(i) {
                            return (
                                <Card 
                                    key={i.id}
                                    itemName={i.title}
                                    price={i.price}
                                    rating = {i.rating? parseFloat(i.rating.rate).toFixed(1) :0}
                                    reviewers = {i.reviewers ? i.reviewers : 0}
                                    image = {i.image}
                                    onEdit={()=>{redirectEditProduct(i.id)}}
                                    onDelete={()=>{handleDelete(i.id)}}
                                    addToCart={()=>{addToCart(i.id)}}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

