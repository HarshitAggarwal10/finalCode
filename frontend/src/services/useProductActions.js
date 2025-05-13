import { useState, useEffect, useContext } from 'react';
import { addToWishlist, addToCart } from './api'; // Removed getWishlist and getCart imports
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const useProductActions = () => {
    const [loadingStates, setLoadingStates] = useState({});
    const [wishlist, setWishlist] = useState([]); // Ensure this is an array
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });

    const { user } = useAuth();

    // Removed fetchData useEffect for wishlist and cart
    // Just initializing empty arrays for now

    const handleWishlist = async (product) => {
 if (!user) {
 toast.error('Please log in to perform this action.');
 return;
 }

        const isInWishlist = wishlist.some(item => item.productId === product._id);
        setLoadingStates(prev => ({ ...prev, [product._id]: true }));

        try {
            if (isInWishlist) {
                // skip remove logic for now
                setWishlist(wishlist.filter(item => item.productId !== product._id));
                setSuccess('Removed from wishlist');
            } else {
                await addToWishlist(user._id, product._id, { headers: getAuthHeaders() });
                setWishlist([...wishlist, { productId: product._id, ...product }]);
                setSuccess('Added to wishlist');
            }
        } catch (error) {
            console.error('Error managing wishlist:', error);
            setError(error.response?.data?.message || 'Failed to update wishlist');
        } finally {
            setLoadingStates(prev => ({ ...prev, [product._id]: false }));
            setTimeout(() => {
                setSuccess(null);
                setError(null);
            }, 3000);
        }
    };

    const handleAddToCart = async (product) => {
 if (!user) {
 toast.error('Please log in to perform this action.');
 return;
 }

        setLoadingStates(prev => ({ ...prev, [product._id]: true }));
        try {
            console.log('User ID being sent to addToCart:', user._id);
            await addToCart(user._id, product._id, { headers: getAuthHeaders() });
            setCart([...cart, { productId: product._id, ...product }]);
            setSuccess('Added to cart successfully');
        } catch (error) {
            console.error('Error adding to cart:', error);
            setError(error.response?.data?.message || 'Failed to add to cart');
        } finally {
            setLoadingStates(prev => ({ ...prev, [product._id]: false }));
            setTimeout(() => {
                setSuccess(null);
                setError(null);
            }, 3000);
        }
    };

    const isInWishlist = (productId) => wishlist.some(item => item.productId === productId);
    const isInCart = (productId) => cart.some(item => item.productId === productId);
    const getCartItemQuantity = (productId) => {
        const item = cart.find(item => item.productId === productId);
        return item ? item.quantity : 0;
    };

    return {
        isInWishlist,
        handleWishlist,
        handleAddToCart,
        loadingStates,
        wishlist,
        cart,
        isInCart,
        getCartItemQuantity,
        error,
        success,
    };
};

export default useProductActions;
