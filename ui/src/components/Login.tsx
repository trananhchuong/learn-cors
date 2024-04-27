import { FormEvent, useState } from "react";
import { baseApi } from "../App";

export default function Login() {
  const [email, setEmail] = useState("chapter@gmail.com");
  const [password, setPassword] = useState("Chapter@123");

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataLogin = {
      username: email,
      password,
    };

    fetch(`${baseApi}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // nếu không config credentials thì server không set được cookie cho dù call api thành công
      credentials: "include",
      body: JSON.stringify(dataLogin),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
      });
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
