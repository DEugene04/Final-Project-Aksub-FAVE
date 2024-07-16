import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home2";
import EditPage from "./components/EditPage";
import CartPage from "./components/CartPage";

export default function App (){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/edit/:id" element={<EditPage/>}/>
                <Route path="/myCart" element={<CartPage/>}/>
            </Routes>
        </Router>
    )
}