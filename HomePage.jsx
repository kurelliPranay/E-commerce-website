import { useEffect, useState } from "react";
import API from "../services/api";

function HomePage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const { data } = await API.get("/products");

        setProducts(data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProducts();

  }, []);


  const addToCart = async (productId) => {

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/cart",
        {
          product: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added To Cart");

    } catch (error) {

      console.log(error);

    }

  };


  return (
    <div style={{ padding: "20px" }}>

      <h2>Products</h2>

      {products.map((product) => (

        <div
          key={product._id}
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
<img
  src={product.image}
  alt={product.name}
  style={{
    width: "200px",
    height: "200px",
    objectFit: "cover",
  }}
/>
          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <p>₹ {product.price}</p>

          <button
            onClick={() => addToCart(product._id)}
          >
            Add To Cart
          </button>

        </div>

      ))}

    </div>
  );
}

export default HomePage;