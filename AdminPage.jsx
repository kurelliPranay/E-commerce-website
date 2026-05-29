import { useEffect, useState } from "react";

import API from "../services/api";

function AdminPage() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const { data } = await API.get("/products");

      setProducts(data);

    } catch (error) {

      console.log(error);

    }

  };

  const addProduct = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/products",
        {
          name,
          description,
          price,
          image,
          stock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Added");

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteProduct = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Admin Dashboard</h1>

      <form onSubmit={addProduct}>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Add Product
        </button>

      </form>

      <hr />

      <h2>All Products</h2>

      {products.map((product) => (

        <div
          key={product._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >

          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
            }}
          />

          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <p>₹ {product.price}</p>

          <button
            onClick={() =>
              deleteProduct(product._id)
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );

}

export default AdminPage;