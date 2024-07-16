
export default function Category({categoryName, photo}){
    return (
        <div className="categories">
            <img src={photo} alt="" />
            <div className="categories__name">
                <h3>{categoryName}</h3>
                <button><i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    )
}