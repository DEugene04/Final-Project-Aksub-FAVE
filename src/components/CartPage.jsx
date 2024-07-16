import axios from "axios"
import { useEffect, useState } from "react"
import "../addToCart.css"

export default function CartPage() {
    const [quantity, setQuantity] = useState(1);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState([])

    useEffect(() => {
        async function getData() {
            const response = await axios.get("http://localhost:2000/cart")
            console.log(response.data);
            const productWithQuantity = response.data.map(product => ({
                ...product, quantity: 1
            }))
            setCartProducts(productWithQuantity)
            calculateTotalPrice(productWithQuantity)
        }
        getData()
    }, [])

    const handleQuantityChange = (id, increment) => {
        const updatedCartProducts = cartProducts.map(product => {
            if (product.id === id) {
                const newQuantity = product.quantity + increment
                if (newQuantity > 0) {
                    return {...product, quantity: newQuantity}
                }
            }
            return product
        })
        setCartProducts(updatedCartProducts)
        calculateTotalPrice(updatedCartProducts)
    }

    const calculateTotalPrice = (products) => {
        const total = products.reduce((sum, product) => {
            return sum + (product.price * product.quantity)
        }, 0)
        setTotalPrice(total)
    }

    return (
        <div className="cart__container">
            
            <div className="table__container">
                <h2 className="myCart__title">My Cart</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody className="cart__information">
                    {cartProducts.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <div>
                                        <img src={product.image} alt="" />
                                        <h2>{product.title}</h2>
                                    </div>
                                </td>
                                <td>${product.price}</td>
                                <td>
                                    <div className="cart__quantity">
                                        <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                                        <p>{product.quantity}</p>
                                        <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                                    </div>
                                </td>
                                <td>${product.price * quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="cart__payments">
                <hr />
                <div className="cart__total">
                    <h2>Cart Total</h2>
                    <h1>${totalPrice}</h1>
                </div>
                <h3>Shipping fees are calculated during checkout</h3>
                <button className="checkout__button">Checkout</button>
            </div>
        </div>
    )
}