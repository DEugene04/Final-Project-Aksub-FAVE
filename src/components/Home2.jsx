import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import RecomendedForYou from "./RecomendedForYou";
import Category from "./category";
import ProductsCard from "./ProductsCard";

import homePhoto from "/homepage photo.jpg";
import shirtCategory from "/shirt category.jpg";
import pantCategory from "/pants category.jpg";
import jacketCategory from "/jacket category.jpg";

import "../home2.css";
import "../category.css";
import { useNavigate } from "react-router-dom";

export default function Home2() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get("http://localhost:3000/product");
                console.log(response.data);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, []);

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

    const addToCart = async function (id) {
        try {
            const findProduct = products.find(product => product.id === id)
            const updateCart = await axios.post('http://localhost:2000/cart', findProduct)
        } catch (error) {
            console.log("Failed to add to cart: ", error);
        }
    }

    return (
        <div>
            <div className="home__photo">
                <img src={homePhoto} alt="" />
            </div>

            <Navbar />

            <div className="home__title">
                <div className="title__wrapper">
                    <h1>Leveraging Fashion</h1>
                    <h3>Start your journey with us</h3>
                    <button className="title__button">Shop Now</button>
                </div>
            </div>

            {/* Recomended for user section */}
            <RecomendedForYou />

            {/* Category section */}
            <div className="category__container">
                <Category categoryName="SHIRT" photo={shirtCategory} />
                <Category categoryName="PANTS" photo={pantCategory} />
                <Category categoryName="Jackets" photo={jacketCategory} />
            </div>

            {/* Product showcase section */}
            <div className="productShowcase__container">
                {/* Best Seller */}
                <h2>Our Products</h2>
                <div className="productShowcase__bestSeller">
                    {products.map((product) => (
                        <ProductsCard
                            key={product.id}
                            productName={product.title}
                            productPrice={product.price}
                            photo={product.image}
                            onEdit={() => redirectEditProduct(product.id)}
                            onDelete={() => handleDelete(product.id)}
                            admins={true}
                            addToCart={() => {addToCart(product.id)}}
                        />
                    ))}

                </div>
                {/* Suit your tastes */}
                {/* New comers */}
            </div>
        </div>
    );
}
