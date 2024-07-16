import shirtPhoto from "/recomended shirt.png"
import "../productCard.css"

export default function ProductsCard({productName, productPrice, photo, onEdit, onDelete, admins, addToCart}) {
    return (
        <div className="product__cards">
                <img src={photo} alt="" />
                <div className="product__texts">
                    <div className="product__information">
                        <h4>{productName}</h4>
                        <h4>${productPrice}</h4>
                    </div>
                    <div className="product__addToCart">
                        <button onClick={addToCart}><i className="fa-solid fa-cart-plus"></i></button>
                    </div>
                </div>
                {admins?
                    <div className="admin__buttons">
                        <button className="edit__button" onClick={onEdit}>Edit</button>
                        <button className="delete__button" onClick={onDelete}>Delete</button>
                    </div> 
                    :
                    ""
                }
            </div>
    )
} 