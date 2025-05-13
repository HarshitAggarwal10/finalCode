import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("/api/cart");
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart data", error);
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/api/cart/${productId}`);
      setCartItems(cartItems.filter(item => item._id !== productId));
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item._id} className="cart-item">
            <img src={item.productId.image} alt={item.productId.name} />
            <p>{item.productId.name}</p>
            <p>${item.productId.price}</p>
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
