import { useEffect, useState } from "react";
import API from "../services/api";

function OrdersPage() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const token = localStorage.getItem("token");

        const { data } = await API.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchOrders();

  }, []);

  return (

    <div style={{ padding: "20px" }}>

      <h1>My Orders</h1>

      {orders.map((order) => (

        <div
          key={order._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >

          <h3>Order ID: {order._id}</h3>

          <p>Status: {order.status}</p>

          <p>Total: ₹ {order.totalPrice}</p>

        </div>

      ))}

    </div>

  );

}

export default OrdersPage;