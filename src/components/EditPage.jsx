import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import "../editPage.css"
import Form from "./Form";

export default function EditPage(){
    const [product, setProduct] = useState({
        title: "",
        price: 0,
        rating: { rate: 0 },
        reviewers: 0,
        image: ""
    })
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(function(){
        async function fetchProduct(){
            const response = await axios.get(`http://localhost:3000/product/${id}`)
            setProduct(response.data)
            console.log(response.data);
        }
        fetchProduct()
    }, [id])

    const handleChange = function (e) {
        const {name, value} = e.target
        if (name === "rate") {
            setProduct((prev)=>({
                ...prev, rating: {...prev.rating, rate: parseFloat(value)}
            }))
        } else {
            setProduct((prev)=>({
                ...prev, [name] : value
            }))
        }
    }

    const handleUpdate = async function(e) {
        e.preventDefault();
        try {
            const updateResponse = await axios.patch(`http://localhost:3000/product/${id}`, product)
            navigate("/")
            console.log("Successfully update");
        } catch (error) {
            console.log("Update failed: ", error);
        }
    }
    console.log(product);
    return (
    <div className="edit__container">
      <form onSubmit={handleUpdate} className="form">
      <h2>Edit Product</h2>
        <Form 
            type="text"
            name="title"
            value={product.title}
            placeholder="Update product title..."
            onChange={handleChange}
            htmlFor={"title"}
            label={"Product Name"}
        />
        <Form 
            type="number"
            name="price"
            value={product.price}
            placeholder="Update price..."
            onChange={handleChange}
            htmlFor={"price"}
            label={"Product price"}
        />
        <Form 
            type="number"
            name="rate"
            value={product.rating.rate}
            placeholder="Update rating..."
            onChange={handleChange}
            htmlFor={"rate"}
            label={"Product Rating"}
        />
        <Form 
            type="text"
            name="image"
            value={product.image}
            placeholder="Update image url..."
            onChange={handleChange}
            htmlFor={"image"}
            label={"Image URL"}
        />
        <Form 
            type="number"
            name="reviewers"
            value={product.reviewers}
            placeholder="Update product reviewers..."
            onChange={handleChange}
            htmlFor={"reviewers"}
            label={"Reviewers"}
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
    )
}