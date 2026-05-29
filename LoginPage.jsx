import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Login</h1>

      <form onSubmit={submitHandler}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );

}

export default LoginPage;