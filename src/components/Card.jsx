import { useState } from "react";
import "../card.css"


export default function Card({itemName, price, rating, reviewers, image, onEdit, onDelete, addToCart, admins}){
    const [count, setCount] = useState(1);
    
    return (
        <article className="card__container">
                <img src={image} alt={image} />
                <h2 className="card__title">{itemName}</h2>
                <div className="card__review-container">
                    <p className="card__review">{rating} ({reviewers} Reviewers)</p>
                </div>
                <div className="card__purchase-info">
                    <p className="card__price">${price}</p>
                    <div className="card__counter">
                        <button 
                            onClick={function () {
                                count > 0 ? 
                                setCount(count - 1) :
                                ""
                            }}
                        >
                            -
                        </button>

                        <p 
                            className="card__amount-counter">{count}
                        </p>

                        <button 
                            onClick={function(){
                                setCount(count + 1)
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>

                {admins?
                    <div className="admin__buttons">
                        <button onClick={onEdit}>Edit</button>
                        <button onClick={onDelete}>Delete</button>
                    </div> 
                    :
                    ""
                }
        </article>
    )
}