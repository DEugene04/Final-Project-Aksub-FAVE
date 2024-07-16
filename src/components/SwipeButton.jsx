import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../swipeButton.css"

export default function SwipeButton(){
    const buttonRef = useRef(null)
    const [startX, setStartx] = useState(0)
    const [currentX, setCurrentX] = useState(0)
    const [isSwiping, setIsSwiping] = useState(false)
    const navigate = useNavigate();

    const handleMouseDown = function (e) {
        setIsSwiping(true)
        setStartx(e.clientX)
        setCurrentX(e.clientX)
    }

    const hanldeMouseMove = function (e) {
        if (isSwiping) {
            setCurrentX(e.clientX)
        }
    }

    const hanldeMouseUp = function () {
        setIsSwiping(false)
        if (currentX - startX > buttonWidth - 50) {
            navigate('/products')
        } else {
            setCurrentX(startX)
        }
    }

    return (
        <div className="swipe-container">
            <div 
                className="swipe-button"
                ref={buttonRef}
                onMouseDown={handleMouseDown}
                onMouseUp={hanldeMouseUp}
                onMouseMove={hanldeMouseMove}
                style={{ transform: `translateX(${Math.max(0, currentX - startX)}px)` }}
                >
                Swipe to proceed
            </div>
        </div>
    )
}