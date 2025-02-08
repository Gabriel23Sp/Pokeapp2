import React, { useEffect, useState } from 'react'
import UserProfile from '../components/UserProfile'

const USERS_JSON = "users.json";

async function fetchUsers() {
  try {
    const response = await fetch(USERS_JSON);
    return await response.json();
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
}

export default function LoginApp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleLogin = () => {
    const user = users.find(
      (u) => u.nickname === username && u.password === password
    );
    if (user) {
      setLoggedInUser(user);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loggedInUser ? (
        <UserProfile user={loggedInUser} users={users} setUsers={setUsers} setLoggedInUser={setLoggedInUser} />
      ) : (
        <div className="p-6 bg-white rounded-xl shadow-md w-80">
          <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
          <input
            type="text"
            placeholder="Usuario"
            className="w-full p-2 border rounded mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border rounded mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
