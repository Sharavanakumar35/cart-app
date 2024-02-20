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
    addToCart(product, quantity);
  };

  const handleRemoveFromCart = (productId) => {
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

          return (
            <div className="mb-4" key={product.id}>
              <div className="card" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s' }}>
                <img src={product.thumbnail} className="card-img-top" alt={product.title} />
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
                      value={product?.quantity ? product?.quantity : 0}
                      onChange={(e) => handleQuantityChange(product, e)}
                    />
                  </div>
                    <div>
                      <p>Sub Total: ${subtotal}</p>
                      <button className="btn btn-danger my-2" onClick={() => handleRemoveFromCart(product.id)} disabled={product.quantity <= 0}>
                        Remove from Cart
                      </button>
                      <button className="btn btn-outline-dark my-2 ms-2" onClick={() => handleAddToCart(product, product.quantity)}>
                        Add to Cart
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
