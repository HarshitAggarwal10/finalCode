import axios from "axios";

// Set the base URL for the API
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Function to add an item to the cart
export const addToCart = async (userId, productId, config) => {
  try {
    const response = await api.post("/cart/add", { userId, productId }, config);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart", error);
    throw error;
  }
};

// Example function to add an item to the wishlist
export const addToWishlist = async (userId, productId, config) => {
  try {
    const response = await api.post("/wishlist", { userId, productId }, config);
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist", error);
    throw error;
  }
};


// Example function to get cart data
export const getCart = async (config) => {
  try {
    const response = await api.get("/cart", config);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart", error);
    throw error;
  }
};

// Example function to get wishlist data
export const getWishlist = async (config) => {
  try {
    const response = await api.get("/wishlist", config);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist", error);
    throw error;
  }
};

// Example function to remove item from wishlist
export const removeFromWishlist = async (productId, config) => {
  try {
    const response = await api.delete(`/wishlist/${productId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist", error);
    throw error;
  }
};

export default api;
