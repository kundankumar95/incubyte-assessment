import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add to cart 
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  //  Decrease quantity
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  //  Total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
