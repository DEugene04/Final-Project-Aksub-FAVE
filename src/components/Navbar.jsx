import { useNavigate } from "react-router-dom"
import "../navbar.css"

export default function Navbar(){

    const navigate = useNavigate();
    return (
        <div className="navbar__container">
            <nav>
                <div className="navbar__wrapper">
                    <div className="navbar__left">
                        <select name="category" id="">
                            <option value="" className="option__category" hidden>Category</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                        </select>
                        <h5>Shop</h5>
                        <h5>About us</h5>
                        <h5 onClick={() => navigate("/myCart")}>My Cart</h5>
                    </div>
                    <div className="navbar__middle">
                        <h3>DnF Outfit</h3>
                    </div>
                    <div className="navbar__right">
                        <button className="register__button" onClick={() => navigate("/register")}>Register</button>
                        <button className="login__button" onClick={() => navigate("/login")}>Login</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}