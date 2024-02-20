import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import productData from "../components/product.json";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, removeFromCart } = useCart();


  useEffect(() => {
    setProducts(productData.products);
  }, []);

  const handleAddToCart = (product, quantity) => {
    if (isNaN(quantity) || quantity < 0) {
      quantity = 0;
    }

    setProducts((prevProducts) => {
      const existingItemIndex = prevProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex === -1) {
        return [...prevProducts, { ...product, inCart: true }];
      }

      return prevProducts.map((item, index) =>
        index === existingItemIndex ? { ...item, inCart: true } : item
      );
    });

    addToCart(product, quantity);
  };

  const handleRemoveFromCart = (productId) => {
    setProducts((prevProducts) => {
      const existingItemIndex = prevProducts.findIndex(
        (item) => item.id === productId
      );
      if (existingItemIndex !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingItemIndex].inCart = false;
        return updatedProducts;
      }
      return prevProducts;
    });
    removeFromCart(productId);
  };

  const handleQuantityChange = (product, event) => {
    event.preventDefault();

    let quantity = Number(event.target.value);

    if (isNaN(quantity) || quantity < 0) {
      quantity = 0;
    }

    setProducts((prevProducts) => {
      const existingItemIndex = prevProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex === -1) {
        return [...prevProducts, { ...product, quantity }];
      }

      return prevProducts.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity } : item
      );
    });
  };

  const calculateSubtotal = (product, quantity) => {
    return product.price * quantity;
  };

  return (
    <>
      <div className="container my-5">
      <div className="row">
        {products.map(product => {
          const subtotal = calculateSubtotal(product, product?.quantity ? product?.quantity : 0);
          const quantity = product && product.quantity ? product.quantity : 0;
          const isInCart = product && product.inCart ? true : false;

          return (
            <div className="mb-4" key={product.id}>
              <div
                className="card"
                style={{
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s",
                }}
              >
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Price: ${product.price}</p>
                  <div className="form-group">
                    <label className="form-label">Quantity:</label>
                    <input
                      type="number"
                      className="form-control"
                      id={`quantity-${product.id}`}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(product, e)}
                    />
                  </div>
                  <div>
                    <p>Sub Total: ${subtotal}</p>
                    <button
                      className={`btn ${
                        isInCart ? "btn-danger" : "btn-outline-dark"
                      } my-2${isInCart ? "" : " ms-2"}`}
                      onClick={() =>
                        isInCart
                          ? handleRemoveFromCart(product.id)
                          : handleAddToCart(product, quantity)
                      }
                      disabled={quantity <= 0}
                    >
                      {isInCart ? "Remove from Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default ProductList;
