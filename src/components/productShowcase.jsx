export default function ProductShowcase({image, productName, description, price}){
    return (
        <div className="productShowcase__bestSeller">
        <div className="productShowcase__card">
            <img src={image} alt="" />
            <div className="productShowcase__info">
                <h2>{productName}</h2>
                <h4>{description}</h4>
                <h2>${price}</h2>
            </div>
            <div className="productShowcase__cart">
                <button><i className="fa-solid fa-cart-plus"></i></button>
            </div>
        </div>
    </div>
    )
}