import shirtPhoto from "/recomended shirt.png"
import "../productCard.css"
import ProductsCard from "./ProductsCard"


export default function RecomendedForYou(){
    return (
        <div className="grid__container">
            <div className="product__cards">
                <div className="recomended__title">
                    <h3>Just for you</h3>
                    <h5>We made selection of your favourite products</h5>
                </div>
                <div className="recomended__title">
                    <h4>SEE ALL</h4>
                </div>
            </div>
            <div className="scroll__container">
                <ProductsCard 
                    productName="Black shirt"
                    productPrice="10.30"
                    photo={shirtPhoto}
                    admins={false}
                />
                <ProductsCard 
                    productName="Black shirt"
                    productPrice="10.30"
                    photo={shirtPhoto}
                    admins={false}
                />
                <ProductsCard 
                    productName="Black shirt"
                    productPrice="10.30"
                    photo={shirtPhoto}
                    admins={false}
                />
                <ProductsCard 
                    productName="Black shirt"
                    productPrice="10.30"
                    photo={shirtPhoto}
                    admins={false}
                />
                <ProductsCard 
                    productName="Black shirt"
                    productPrice="10.30"
                    photo={shirtPhoto}
                    admins={false}
                />
            </div>
        </div>
    )
}