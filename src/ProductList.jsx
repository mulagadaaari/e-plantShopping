import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList({ onHomeClick }) {

    const dispatch = useDispatch();

    const [showCart, setShowCart] = useState(false);

    // ✅ GET CART FROM REDUX
    const cartItems = useSelector((state) => state.cart.items);

    // ✅ TOTAL QUANTITY (for cart badge)
    const totalQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: 15
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: 12
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba",
                    description: "Calming scent, used in aromatherapy.",
                    cost: 20
                },
                {
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b",
                    description: "Sweet fragrance, promotes relaxation.",
                    cost: 18
                }
            ]
        }
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };

    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    // ✅ ADD TO CART
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return (
        <div>

            {/* NAVBAR */}
            <div className="navbar" style={styleObj}>
                <div className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                    <a href="/" onClick={handleHomeClick}>
                        <div>
                            <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                            <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                        </div>
                    </a>
                </div>

                <div style={styleObjUl}>
                    <a href="#" style={styleA}>Plants</a>

                    {/* ✅ CART WITH COUNT BADGE */}
                    <a href="#" onClick={handleCartClick} style={styleA}>
                        🛒
                        <span style={{
                            marginLeft: "8px",
                            fontSize: "16px",
                            background: "red",
                            borderRadius: "50%",
                            padding: "4px 8px",
                            color: "white"
                        }}>
                            {totalQuantity}
                        </span>
                    </a>
                </div>
            </div>

            {/* CONTENT */}
            {!showCart ? (
                <div className="product-grid">

                    {plantsArray.map((categoryObj, index) => (
                        <div key={index}>

                            <h2>{categoryObj.category}</h2>

                            <div className="plants-container">
                                {categoryObj.plants.map((plant) => {

                                    // ✅ CHECK IF ITEM ALREADY IN CART
                                    const isAdded = cartItems.some(
                                        item => item.name === plant.name
                                    );

                                    return (
                                        <div key={plant.name} className="product-card">

                                            <h3>{plant.name}</h3>

                                            <img src={plant.image} alt={plant.name} />

                                            <p>{plant.description}</p>

                                            <p>₹{plant.cost}</p>

                                            <button
                                                onClick={() => handleAddToCart(plant)}
                                                disabled={isAdded}
                                            >
                                                {isAdded ? "Added" : "Add to Cart"}
                                            </button>

                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    ))}

                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}

        </div>
    );
}

export default ProductList;