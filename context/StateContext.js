import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

let foundProduct;

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    product.totalPrice = product.price * quantity;
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updateCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });

      setCartItems(updateCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.totalPrice);
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);

    toast.error(`delete ${qty} ${product.name}`);
  };

  const toggleCartItemQuanitity = (id, value, product) => {
    foundProduct = cartItems.find((item) => item._id === id);

    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        if (value === "inc") {
          const updatedItem = { ...item, quantity: item.quantity + 1 };
          setTotalPrice((prevTotalPrice) => prevTotalPrice + item.price);
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
          return updatedItem;
        } else if (value === "dec") {
          if (item.quantity > 1) {
            const updatedItem = { ...item, quantity: item.quantity - 1 };
            setTotalPrice((prevTotalPrice) => prevTotalPrice - item.price);
            setTotalQuantities(
              (prevTotalQuantities) => prevTotalQuantities - 1
            );
            return updatedItem;
          } else {
            // Remove the item from cartItems
            setTotalPrice((prevTotalPrice) => prevTotalPrice - item.price);
            setTotalQuantities(
              (prevTotalQuantities) => prevTotalQuantities - 1
            );
            toast.error(`delete ${product.name}`);

            return null;
          }
        }
      }
      return item;
    });

    const filteredCartItems = updatedCartItems.filter((item) => item !== null);
    setCartItems(filteredCartItems);
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => prevQty - 1);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setQty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
