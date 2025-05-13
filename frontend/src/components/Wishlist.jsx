import React, { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get("/api/wishlist");
        setWishlistItems(data);
      } catch (error) {
        console.error("Error fetching wishlist data", error);
      }
    };
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`/api/wishlist/${productId}`);
      setWishlistItems(wishlistItems.filter(item => item._id !== productId));
    } catch (error) {
      console.error("Error removing item from wishlist", error);
    }
  };

  return (
    <div>
      <h1>Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlistItems.map(item => (
          <div key={item._id} className="wishlist-item">
            <img src={item.productId.image} alt={item.productId.name} />
            <p>{item.productId.name}</p>
            <p>${item.productId.price}</p>
            <button onClick={() => removeFromWishlist(item._id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
