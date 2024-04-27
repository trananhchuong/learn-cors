import { useEffect, useState } from "react";
import Login from "./components/Login";

export const baseApi = "https://testcookie.com:8000/api";
// export const baseApi = "http://localhost:8000/api";

interface User {
  id: number;
  username: string;
  name: string;
}

function App() {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();
  console.log("🚀 ~ App ~ error:", error)

  useEffect(() => {
    fetch(`${baseApi}/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data: User) => {
        console.log("🚀 ~ .then ~ data:", data);
        setUser(data);
      })
      .catch((err) => {
        if (err.status === 401) {
          setUser(undefined);
          setError("Unauthorized");
          return;
        }
      });
  }, []);

  const handleLogout = () => {
    fetch(`${baseApi}/logout`, {
      credentials: "include",
    })
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res);
        if (res.ok) {
          res.json();
        }
        throw res;
      })
      .then(() => {
        setUser(undefined);
      });
  };

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <h1>Welcome, {user.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;
