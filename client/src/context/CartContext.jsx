import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_KEY = "curamed_cart";

function loadCart() {
  try {
    const savedCart = localStorage.getItem(CART_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.filter(
      (item) =>
        item &&
        item.id &&
        item.name &&
        Number(item.quantity) > 0
    );
  } catch (error) {
    console.error("Failed to load cart:", error);

    localStorage.removeItem(CART_KEY);

    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    // Tell other components that cart changed
    window.dispatchEvent(new Event("curamed:cart"));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
}

function normalizeQuantity(quantity, moq) {
  const safeQuantity = Number(quantity) || moq;
  const safeMoq = Number(moq) || 1;

  // Always keep quantity as a multiple of MOQ
  return Math.max(
    safeMoq,
    Math.floor(safeQuantity / safeMoq) * safeMoq
  );
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  /*
   * Save cart whenever it changes
   */
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  /*
   * Add product to cart
   *
   * Example:
   * addToCart(product)
   * → adds MOQ
   *
   * addToCart(product, 500)
   * → adds 500
   */
  const addToCart = (product, quantity = null) => {
    if (!product || !product.id) {
      return {
        success: false,
        message: "Invalid product",
      };
    }

    const stock = Number(product.stock) || 0;
    const moq = Number(product.moq) || 1;

    if (stock <= 0) {
      return {
        success: false,
        message: "Product is out of stock",
      };
    }

    const requestedQuantity =
      quantity === null
        ? moq
        : normalizeQuantity(quantity, moq);

    let result = {
      success: false,
      message: "Unable to add product",
    };

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      /*
       * Product already exists
       */
      if (existingProduct) {
        const newQuantity =
          existingProduct.quantity + requestedQuantity;

        /*
         * Don't allow quantity above stock
         */
        if (newQuantity > stock) {
          result = {
            success: false,
            message: `Only ${Math.max(
              stock - existingProduct.quantity,
              0
            )} more ${product.unit || "units"} available`,
          };

          return currentCart;
        }

        result = {
          success: true,
          message: `${product.name} quantity updated`,
        };

        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: newQuantity,
                stock,
                price: product.price,
              }
            : item
        );
      }

      /*
       * New product
       */
      if (requestedQuantity > stock) {
        result = {
          success: false,
          message: `Only ${stock} ${product.unit || "units"} available`,
        };

        return currentCart;
      }

      result = {
        success: true,
        message: `${product.name} added to cart`,
      };

      return [
        ...currentCart,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          sku: product.sku,
          price: Number(product.price) || 0,
          moq,
          unit: product.unit || "units",
          stock,
          image: product.image || "",
          quantity: requestedQuantity,
        },
      ];
    });

    return result;
  };

  /*
   * Increase quantity by MOQ
   */
  const increaseQuantity = (productId) => {
    let result = {
      success: false,
      message: "Product not found",
    };

    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        const newQuantity = item.quantity + item.moq;

        if (newQuantity > item.stock) {
          result = {
            success: false,
            message: "Maximum available stock reached",
          };

          return item;
        }

        result = {
          success: true,
          message: "Quantity increased",
        };

        return {
          ...item,
          quantity: newQuantity,
        };
      })
    );

    return result;
  };

  /*
   * Decrease quantity by MOQ
   *
   * If quantity reaches 0,
   * the product is removed.
   */
  const decreaseQuantity = (productId) => {
    let result = {
      success: false,
      message: "Product not found",
    };

    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== productId) {
            return item;
          }

          const newQuantity = item.quantity - item.moq;

          if (newQuantity <= 0) {
            result = {
              success: true,
              message: "Product removed from cart",
            };

            return null;
          }

          result = {
            success: true,
            message: "Quantity decreased",
          };

          return {
            ...item,
            quantity: newQuantity,
          };
        })
        .filter(Boolean)
    );

    return result;
  };

  /*
   * Set an exact quantity
   *
   * Useful for the Product Details page.
   *
   * Example:
   * setQuantity("MED001", 500)
   */
  const setQuantity = (productId, quantity) => {
    let result = {
      success: false,
      message: "Product not found",
    };

    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        const newQuantity = normalizeQuantity(
          quantity,
          item.moq
        );

        if (newQuantity > item.stock) {
          result = {
            success: false,
            message: "Quantity exceeds available stock",
          };

          return item;
        }

        result = {
          success: true,
          message: "Quantity updated",
        };

        return {
          ...item,
          quantity: newQuantity,
        };
      })
    );

    return result;
  };

  /*
   * Remove product
   */
  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  /*
   * Clear entire cart
   */
  const clearCart = () => {
    setCart([]);
  };

  /*
   * Check whether product is already in cart
   */
  const isInCart = (productId) => {
    return cart.some(
      (item) => item.id === productId
    );
  };

  /*
   * Get a specific cart item
   */
  const getCartItem = (productId) => {
    return cart.find(
      (item) => item.id === productId
    );
  };

  /*
   * Total quantity
   *
   * Example:
   * Paracetamol = 200
   * Vitamin C = 100
   *
   * cartQuantity = 300
   */
  const cartQuantity = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  }, [cart]);

  /*
   * Number of different products
   */
  const cartItemsCount = cart.length;

  /*
   * Total price
   */
  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );
  }, [cart]);

  /*
   * Total number of individual cart lines
   */
  const cartProducts = cart.length;

  /*
   * Context value
   */
  const value = {
    // Cart
    cart,
    cartProducts,
    cartItemsCount,
    cartQuantity,
    cartTotal,

    // Add
    addToCart,

    // Quantity
    increaseQuantity,
    decreaseQuantity,
    setQuantity,

    // Product
    isInCart,
    getCartItem,

    // Remove
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}