import { useEffect, useState } from "react";
import API from "../services/api";

function CartPage() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

    fetchCart();

  }, []);

  const fetchCart = async () => {

    try {

      const token = localStorage.getItem("token");

      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(data);

    } catch (error) {

      console.log(error);

    }

  };

  const removeFromCart = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(
        cartItems.filter((item) => item._id !== id)
      );

    } catch (error) {

      console.log(error);

    }

  };

  const placeOrder = async () => {

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Placed Successfully");

      setCartItems([]);

    } catch (error) {

      console.log(error);

    }

  };

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );

  return (

    <div style={{ padding: "20px" }}>

      <h1>My Cart</h1>

      {cartItems.length === 0 ? (

        <p>Cart is empty</p>

      ) : (

        <>

          {cartItems.map((item) => (

            <div
              key={item._id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px",
              }}
            >

              <h3>{item.product.name}</h3>

              <p>{item.product.description}</p>

              <p>₹ {item.product.price}</p>

             <div>

  <button>
    -
  </button>

  <span style={{ margin: "0 10px" }}>
    {item.quantity}
  </span>

  <button>
    +
  </button>

</div>

              <button
                onClick={() =>
                  removeFromCart(item._id)
                }
              >
                Remove
              </button>

            </div>

          ))}

          <h2>Total: ₹ {totalPrice}</h2>

          <button onClick={placeOrder}>
            Place Order
          </button>

        </>

      )}

    </div>

  );

}

export default CartPage;